import { useState } from "react";
import { useSearchParams } from "react-router-dom";
import { useProducts } from "../hooks/useProducts";
import { useCategory } from "../../../features/categories/hooks/useCategory";
import type { Product } from "../types/product";
import ProductCard from "../components/ProductCard";
import Select from "../../../components/ui/Select";
import { FiSearch, FiChevronLeft, FiChevronRight, FiLoader } from "react-icons/fi";

export default function ProductsPage() {
    const [searchParams] = useSearchParams();
    const [search, setSearch] = useState("");
    const [categoryId, setCategoryId] = useState(searchParams.get("categoryId") || "");
    const [minPrice, setMinPrice] = useState("");
    const [maxPrice, setMaxPrice] = useState("");
    const [sortBy, setSortBy] = useState("");
    const [sortOrder, setSortOrder] = useState("asc");
    const [pageNumber, setPageNumber] = useState(1);

    const {
        data,
        isLoading,
        isFetching,
        isError,
    } = useProducts({
        pageNumber,
        pageSize: 12,
        search: search || undefined,
        categoryId: categoryId ? Number(categoryId) : undefined,
        minPrice: minPrice ? Number(minPrice) : undefined,
        maxPrice: maxPrice ? Number(maxPrice) : undefined,
        sortBy: sortBy || undefined,
        sortOrder: sortOrder || undefined,
    });

    console.log("Products API response:", data);

    const { data: categories } = useCategory();

    console.log("Categories from hook:", categories);

    const categoryOptions = [
        { value: "", label: "All Categories" },
        ...(categories?.map((cat: { categoryId: number; name: string }) => ({
            value: String(cat.categoryId),
            label: cat.name,
        })) || []),
    ];

    const products: Product[] = data?.items ?? [];
    const totalPages = data?.totalPages ?? 1;
    const totalCount = data?.totalCount ?? 0;

    if (!data && isLoading) {
        return (
            <div className="max-w-7xl mx-auto px-4 py-8">
                <div className="mb-8">
                    <div className="h-8 w-32 bg-gray-200 rounded animate-pulse mb-2"></div>
                    <div className="h-4 w-48 bg-gray-200 rounded animate-pulse"></div>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                    {[...Array(8)].map((_, i) => (
                        <div key={i} className="bg-white rounded-xl border border-gray-200 overflow-hidden">
                            <div className="h-48 bg-gray-200 animate-pulse"></div>
                            <div className="p-5 space-y-3">
                                <div className="h-5 w-3/4 bg-gray-200 rounded animate-pulse"></div>
                                <div className="h-5 w-1/4 bg-gray-200 rounded animate-pulse"></div>
                                <div className="h-3 w-full bg-gray-200 rounded animate-pulse"></div>
                                <div className="h-3 w-1/3 bg-gray-200 rounded animate-pulse"></div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        );
    }

    if (isError) {
        return (
            <div className="flex items-center justify-center min-h-[50vh]">
                <div className="bg-red-50 border border-red-200 text-red-700 rounded-lg p-6 text-center">
                    <p className="font-medium">Something went wrong</p>
                    <p className="text-sm mt-1">Could not load products. Please try again later.</p>
                </div>
            </div>
        );
    }

    const startPage = Math.max(1, pageNumber - 2);
    const endPage = Math.min(totalPages, pageNumber + 2);
    const pageNumbers: number[] = [];
    for (let i = startPage; i <= endPage; i++) {
        pageNumbers.push(i);
    }

    return (
        <div className="max-w-7xl mx-auto px-4 py-8">
            <div className="mb-8">
                <h1 className="text-3xl font-bold text-gray-900">Products</h1>
                <p className="text-gray-500 mt-1">
                    {totalCount} product{totalCount !== 1 ? "s" : ""} found
                </p>
            </div>

            <div className="flex flex-wrap gap-3 mb-8 p-4 bg-white rounded-xl border border-gray-200">
                <div className="relative flex-1 min-w-[200px]">
                    <FiSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                    <input
                        type="text"
                        placeholder="Search products..."
                        value={search}
                        onChange={(e) => {
                            setSearch(e.target.value);
                            setPageNumber(1);
                        }}
                        className="w-full pl-10 pr-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-black focus:border-transparent placeholder:text-gray-400"
                    />
                </div>

                <Select
                    value={categoryId}
                    onChange={(value) => {
                        setCategoryId(value);
                        setPageNumber(1);
                    }}
                    options={categoryOptions}
                    placeholder="All Categories"
                    className="min-w-[180px]"
                />

                <input
                    type="number"
                    placeholder="Min Price"
                    value={minPrice}
                    onChange={(e) => {
                        setMinPrice(e.target.value);
                        setPageNumber(1);
                    }}
                    className="w-28 px-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-black focus:border-transparent placeholder:text-black-400"
                />

                <input
                    type="number"
                    placeholder="Max Price"
                    value={maxPrice}
                    onChange={(e) => {
                        setMaxPrice(e.target.value);
                        setPageNumber(1);
                    }}
                    className="w-28 px-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-black focus:border-transparent placeholder:text-gray-400"
                />

                <select
                    value={sortBy}
                    onChange={(e) => {
                        setSortBy(e.target.value);
                        setPageNumber(1);
                    }}
                    className="px-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-black focus:border-transparent bg-white text-gray-700"
                >
                    <option value="">Sort By</option>
                    <option value="price">Price</option>
                    <option value="name">Name</option>
                </select>

                <select
                    value={sortOrder}
                    onChange={(e) => {
                        setSortOrder(e.target.value);
                        setPageNumber(1);
                    }}
                    className="px-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-black focus:border-transparent bg-white text-gray-700"
                >
                    <option value="asc">Ascending</option>
                    <option value="desc">Descending</option>
                </select>
            </div>

            {(!products || products.length === 0) ? (
                <div className="text-center py-20">
                    <p className="text-gray-500 text-lg">No products found</p>
                    <p className="text-gray-400 text-sm mt-1">Try adjusting your search or filters</p>
                </div>
            ) : (
                <div className="relative">
                    {isFetching && (
                        <div className="absolute inset-0 bg-white/70 z-10 flex items-center justify-center rounded-xl">
                            <FiLoader className="animate-spin text-gray-500 w-8 h-8" />
                        </div>
                    )}
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 mb-8">
                        {products.map((product: Product) => (
                            <ProductCard key={product.productId} product={product} />
                        ))}
                    </div>

                    {totalPages > 1 && (
                        <div className="flex items-center justify-center gap-2">
                            <button
                                onClick={() => setPageNumber((p) => Math.max(1, p - 1))}
                                disabled={pageNumber === 1}
                                className="flex items-center gap-1 px-3 py-2 text-sm rounded-lg border border-gray-300 hover:bg-gray-50 disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
                            >
                                <FiChevronLeft /> Prev
                            </button>

                            {pageNumbers.map((page) => (
                                <button
                                    key={page}
                                    onClick={() => setPageNumber(page)}
                                    className={`w-10 h-10 text-sm rounded-lg border transition-colors ${page === pageNumber
                                        ? "bg-black text-white border-black"
                                        : "border-gray-300 hover:bg-gray-50"
                                        }`}
                                >
                                    {page}
                                </button>
                            ))}

                            <button
                                onClick={() => setPageNumber((p) => Math.min(totalPages, p + 1))}
                                disabled={pageNumber === totalPages}
                                className="flex items-center gap-1 px-3 py-2 text-sm rounded-lg border border-gray-300 hover:bg-gray-50 disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
                            >
                                Next <FiChevronRight />
                            </button>
                        </div>
                    )}
                </div>

            )}
        </div>
    );
}
