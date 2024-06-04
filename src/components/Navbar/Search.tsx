import { AiOutlineSearch } from "react-icons/ai";
import styles from "./Navbar.module.scss";
import { useEffect, useState, useRef } from "react";
import { useAppDispatch } from "../../redux/store";
import { fetchProducts } from "../../redux/features/productSlice";
import { ProductItem } from "../../types/Interfaces";
import { Link } from "react-router-dom";
import SpeechRecognition, {
  useSpeechRecognition,
} from "react-speech-recognition";
import { FaMicrophone, FaRegFileImage } from "react-icons/fa";
import "@tensorflow/tfjs-backend-webgl";
import "@tensorflow/tfjs-backend-cpu";
import * as cocossd from "@tensorflow-models/coco-ssd";
import { imageHandler } from "../../utils/imageHandler";
import { toast } from "react-toastify";

const Search = () => {
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("");
  const [products, setProducts] = useState([]);
  const [result, setResult] = useState([]);
  const imageOpenerRef = useRef<HTMLInputElement>(null);
  const imageRef = useRef<HTMLImageElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const dispatch = useAppDispatch();

  const searchHandler = (val: string) => {
    console.log(filter)
    if(filter === "smartphones" || filter === "laptops"){
      setSearch(filter)
      setFilter("")
    }
    setSearch(val);
  };

  // Speech Recognision
  const { transcript, browserSupportsSpeechRecognition } =useSpeechRecognition();
  if (!browserSupportsSpeechRecognition) return <span>Browser doesn't support speech recognition.</span>;
  

  useEffect(() => {
    setSearch(transcript);
  }, [transcript]);

  useEffect(() => {
    const fetchingProducts = async () => {
      const response = await dispatch(fetchProducts());
      setProducts(response.payload);
    };
    fetchingProducts();
  }, [dispatch]);

  useEffect(() => {
    const result = setTimeout(() => {
      const filteredProducts = products.filter((product: ProductItem) =>
        product.title.toLowerCase().includes(search.toLowerCase())
      );
      setResult(filteredProducts);
    }, 500);
    return () => clearTimeout(result);
  }, [search, products]);

  useEffect(() => {
    const filteredProducts = products.filter((product: ProductItem) =>
      product.category.toLowerCase().includes(filter.toLowerCase())
    );
    setResult(filteredProducts);
  }, [filter]);

  // Image Recognision
  const imageOpener = () => {
    if (imageOpenerRef.current) {
      imageOpenerRef.current.click();
    }
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        if (imageRef.current) {
          imageRef.current.src = event.target?.result as string;
        }
      };
      reader.readAsDataURL(file);
    }
  };

  const detect = async () => {
    const net = await cocossd.load();
    const image = imageRef.current;

    if (image && image.complete) {
      const imageWidth = image.width;
      const imageHeight = image.height;

      if (canvasRef.current) {
        canvasRef.current.width = imageWidth;
        canvasRef.current.height = imageHeight;

        const ctx = canvasRef.current.getContext("2d");

        if (ctx) {
          ctx.clearRect(
            0,
            0,
            canvasRef.current.width,
            canvasRef.current.height
          );
          ctx.drawImage(image, 0, 0, imageWidth, imageHeight);

          const obj: any = await net.detect(image);
          if (obj.length === 0) {
            toast.error("Not Found", {
              position: "top-right",
              autoClose: 1000,
              hideProgressBar: false,
              closeOnClick: true,
              draggable: true,
              progress: undefined,
              theme: "light",
            });
          }

          obj.forEach((prediction: any) => {
            const res: any = imageHandler(obj);
            if (res === "Bad Detection") {
              toast.error("Bad Detection", {
                position: "top-right",
                autoClose: 1000,
                hideProgressBar: false,
                closeOnClick: true,
                draggable: true,
                progress: undefined,
                theme: "light",
              });
              return;
            } else if (res.category !== "No detection") {
              setFilter(res.category);
            } else {
              setSearch(res.object);
            }
            const [x, y, width, height] = prediction.bbox;
            const color = Math.floor(Math.random() * 16777215).toString(16);
            ctx.strokeStyle = "#" + color;
            ctx.font = "18px Arial";
            ctx.beginPath();
            ctx.fillStyle = "#" + color;
            ctx.fillText(prediction.class, x, y);
            ctx.rect(x, y, width, height);
            ctx.stroke();
          });
        }
      }
    }
  };

  const handleImageLoad = () => {
    detect();
    setFilter("");
  };

  return (
    <div className={styles.input}>
      <label htmlFor="search">
        <AiOutlineSearch />
      </label>
      <input
        type="text"
        placeholder="Search"
        id="search"
        value={filter !== "" ? filter : search}
        onChange={(e) => searchHandler(e.target.value)}
      />
      <p
        className={styles.microphone}
        onClick={() => SpeechRecognition.startListening()}
      >
        <FaMicrophone />
      </p>
      <p className={styles.image} onClick={imageOpener}>
        {" "}
        <FaRegFileImage />
      </p>
      <input
        type="file"
        accept="image/*"
        onChange={handleImageChange}
        ref={imageOpenerRef}
        style={{ display: "none" }}
      />
      <img
        ref={imageRef}
        alt="Selected Image"
        onLoad={handleImageLoad}
        style={{ display: "none" }}
      />
      <canvas
        ref={canvasRef}
        style={{
          position: "absolute",
          marginLeft: "auto",
          marginRight: "auto",
          left: 0,
          right: 0,
          textAlign: "center",
          zIndex: 8,
          width: 640,
          height: 480,
          display: "none",
        }}
      />
      {search !== "" || filter !== "" ? (
        <div>
          <ul>
            {result.map((r: ProductItem, i) => (
              <Link to={`/products/${r._id}`} key={i} onClick={() => setSearch("")}>
                <li key={i}>{r.title}</li>
              </Link>
            ))}
          </ul>
        </div>
      ) : (
        ""
      )}
    </div>
  );
};

export default Search;
