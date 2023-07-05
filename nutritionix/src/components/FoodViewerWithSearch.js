import React, {useState, useEffect} from "react";
import axios from "axios";
import FoodSearchForm from "./FoodSearchForm";

const FoodViewerWithSearch = () => {
    const [food, setFood] = useState(null);
    const [url, setUrl] = useState("https://trackapi.nutritionix.com/v2/search/instant?query=''");

    /*const config = {
        headers:{
          "x-app-id": "d066e8f0",
          "x-app-key": "a7d39ccf1e08e2d48b9c541bf1f1f007"

        }
    };*/

    const search = term =>{
        setUrl(`https://trackapi.nutritionix.com/v2/search/instant?query=${term}`);
    };

    useEffect(() => {
        async function loadFood () {
            const res = await axios.get(url,{ headers: {"x-app-id": "fa9a9c19","x-app-key": "b941a6084156dfb2714a633a7d55fb4c"}});
            setFood(res.data);
        }
        loadFood();
    },[url]
    )

    return(
        <div>
            <FoodSearchForm search = {search}/>
            {food? 
            <div> 
                {food.common.map(e=>
                <div>
                    <div><h1>{e.food_name}</h1>
                    <div>Photo : <img src = {e.photo.thumb} alt = "" width = "50"/></div>
                    <div>serving unit : {e.serving_unit}</div>
                    <li>Tag name : {e.tag_name}</li>
                    <li>serving quantity : {e.serving_qty}</li>
                    </div>
                </div>)}
            </div> : <h1>Loading...</h1>}
        </div>
    );

};

export default FoodViewerWithSearch;