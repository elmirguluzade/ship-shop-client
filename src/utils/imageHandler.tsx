const datas: { [key: string]: string[] } = {
    smartphones: ["cell phone", "remote", "traffic light"],
    laptops: ["laptop"]
};

let mainLabel: string;
let mainScore: number;
export const imageHandler = (predictions: any) => {
    console.log(predictions)
    let detectedObject = {category: "No detection", object: "", score: 0};
    if(predictions.length > 1){
        let scoreObj = predictions.map((item: any) => item.score);
        const maxValue: number = Math.max(...scoreObj)
        predictions.forEach((p: any) => {
            if(p.score == maxValue){
                mainLabel = p.class;
                mainScore = p.score;
            }
        })
    } else{
        mainLabel = predictions[0].class
        mainScore = predictions[0].score
        detectedObject.object = mainLabel
        detectedObject.score = mainScore
    }
    // check datas array
    Object.keys(datas).some(key => {
        if (datas[key].includes(mainLabel)) {
            detectedObject.category = key;
            detectedObject.object = mainLabel;
            detectedObject.score = mainScore;
            return true; 
        }
    });
    if(detectedObject.score < 0.70){
        return "Bad Detection"
    }
    return detectedObject
};

    
