// pages/product.js
import ProductDetailClient from '@/app/Components/ProductDetailClient';
import { client } from '@/sanity/lib/client';
import { Params } from 'next/dist/shared/lib/router/utils/route-matcher';

export default async function ProductDetail(context: { params: Promise<Params> }) {
    const params = await context.params;

    if (!params || !params.slug) {
        return <div>Error: Invalid category slug.</div>;
    }

    const { slug } = params;

    // if (!params || !params.id) {
    //     return <div>Error: Invalid product ID.</div>;
    // }

    // const { id } = params;
    console.log(`prod id ${params}`);

    const product = await client.fetch(
        `*[_type == "product" && id == 2][0]{
            id,
            name,
            price,
            "imageUrl": image.asset->url,
            description,
            features,
            dimensions,
            slug,
            tags,
            category->{
                name
            }
        }`,
        { slug }
    );
    console.log(`Fetching product with id: ${slug}`);

    // Handle the case where the product is not found
    if (!product) {
        return (
            <div className="container mx-auto p-4">
                <h1 className="text-3xl font-bold text-center text-red-500">Product Not Found</h1>
            </div>
        );
    }
    console.log("Product data passed to component: ", product);

    return <ProductDetailClient product={product} />;
}
