import { Link } from 'react-router-dom';
import heroDesktop from '../assets/HomepageHeroDesktop.png';
import { useCategory } from '../features/categories/hooks/useCategory';
import { useProducts } from '../features/products/hooks/useProducts';
import ProductCard from '../features/products/components/ProductCard';

export default function HomePage() {
    const { data: categories, isLoading: catsLoading } = useCategory();
    const { data: productsData, isLoading: productsLoading } = useProducts({ pageNumber: 1, pageSize: 8 });
    const latestProducts = productsData?.items ?? [];

    return (
        <>
            <div className="relative w-full h-[500px] bg-cover bg-center bg-no-repeat" style={{ backgroundImage: `url(${heroDesktop})` }}>
                <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/40 to-transparent" />
                <div className="absolute inset-0 flex flex-col items-start justify-center text-white px-4 md:px-16">
                    <span className="inline-block text-xs font-semibold tracking-widest uppercase bg-white/20 backdrop-blur-sm px-3 py-1.5 rounded-full mb-6">
                        New Arrivals
                    </span>
                    <h1 className="text-5xl md:text-6xl font-extrabold leading-tight mb-4">Welcome to Our Store</h1>
                    <p className="text-base md:text-lg text-gray-300 max-w-xl mb-8">Discover the best products at unbeatable prices.</p>
                    <Link
                        to="/products"
                        className="inline-flex items-center gap-2 bg-white text-black py-3 px-10 rounded-lg font-medium hover:bg-gray-100 transition-colors text-lg"
                    >
                        Shop Now
                    </Link>
                </div>
            </div>

            <section className="py-16">
                <div className="max-w-7xl mx-auto px-4">
                    <h2 className="text-2xl font-bold text-gray-900 mb-8">Shop by Category</h2>

                    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
                        {catsLoading ? (
                            Array(5).fill(null).map((_, i) => (
                                <div key={i} className="bg-white rounded-xl border border-gray-200 p-6 text-center">
                                    <div className="h-5 w-3/4 bg-gray-200 rounded animate-pulse mx-auto" />
                                </div>
                            ))
                        ) : (
                            categories?.map((category) => (
                                <Link
                                    key={category.categoryId}
                                    to={`/products?categoryId=${category.categoryId}`}
                                    className="bg-white rounded-xl border border-gray-200 p-6 text-center hover:shadow-lg hover:border-gray-300 transition-all duration-200"
                                >
                                    <span className="font-semibold text-gray-900">{category.name}</span>
                                </Link>
                            ))
                        )}
                    </div>
                </div>
            </section>

            <section className="py-16 bg-gray-50">
                <div className="max-w-7xl mx-auto px-4">
                    <div className="flex items-center justify-between mb-8">
                        <h2 className="text-2xl font-bold text-gray-900">Latest Products</h2>
                        <Link to="/products" className="text-sm text-gray-500 hover:text-black transition-colors">
                            View All &rarr;
                        </Link>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                        {productsLoading ? (
                            Array(4).fill(null).map((_, i) => (
                                <div key={i} className="bg-white rounded-xl border border-gray-200 overflow-hidden">
                                    <div className="h-48 bg-gray-200 animate-pulse" />
                                    <div className="p-5 space-y-3">
                                        <div className="h-5 w-3/4 bg-gray-200 rounded animate-pulse" />
                                        <div className="h-5 w-1/4 bg-gray-200 rounded animate-pulse" />
                                        <div className="h-3 w-full bg-gray-200 rounded animate-pulse" />
                                    </div>
                                </div>
                            ))
                        ) : (
                            latestProducts.map((product) => (
                                <ProductCard key={product.productId} product={product} />
                            ))
                        )}
                    </div>
                </div>
            </section>

            <section className="bg-gray-900 py-16">
                <div className="max-w-7xl mx-auto px-4 text-center">
                    <h2 className="text-3xl font-bold text-white mb-4">Ready to find something great?</h2>
                    <p className="text-gray-400 mb-8 max-w-lg mx-auto">Browse our collection of thousands of products and discover your next favorite item.</p>
                    <Link
                        to="/products"
                        className="inline-block px-8 py-3 border border-white text-white rounded-lg hover:bg-white hover:text-gray-900 transition-colors font-medium"
                    >
                        Browse All Products
                    </Link>
                </div>
            </section>
        </>
    );
}
