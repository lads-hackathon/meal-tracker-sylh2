import { useParams } from "@solidjs/router"
import { createResource, Show } from "solid-js";
import { apiCall } from "../../api";
import NutritionFactsTable from '../../components/NutritionFactsTable'
import { FoodNutritionFacts } from "../../schemas";


export default function ItemPage() {
    const params = useParams();
    

    return (
        <div>
            <h1> hello </h1>
{/* 
            <NutritionFactsTable {...props.food} /> */}
        </div>
    )
}
