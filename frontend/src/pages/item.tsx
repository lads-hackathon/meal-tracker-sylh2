import { useParams } from "@solidjs/router"
import { createResource, Show } from "solid-js";
import { apiCall } from "../api";
import NutritionFactsTable from '../components/NutritionFactsTable'

export default function ItemPage() {
    const params = useParams();
    const [ foodData ] = createResource(async () => await apiCall(`/item/${params.id}`))

    return (
        <div>
            <Show when={ !foodData.loading } fallback={ <h1>Loading</h1> }>
                <NutritionFactsTable {...foodData()} />
            </Show>
        </div>
    )
}
