import httpClient from "../api/httpClient";
import { productEndpoints } from "../api/endpoints";

export default function HomePage() {

    const testApi = async () => {

        try {

            const response = await httpClient.get(productEndpoints.GET_PRODUCTS);

            console.log(response.data);

        } catch (error) {

            console.log(error);
        }
    };

    return (
        <div className="p-10">
                    
        </div>

    );
}