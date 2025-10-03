import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Product } from "@/entities/all";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Link } from "@inertiajs/react";
import { createPageUrl } from "@/utils";
import { ShoppingCart, Sparkles, Leaf, Star, ArrowRight, Zap } from "lucide-react";

import ProductCard from "../components/products/ProductCard";
import SmartSearch from "../components/ai/SmartSearch";

export default function Home() {
  const [featuredProducts, setFeaturedProducts] = useState([]);
  const [searchResults, setSearchResults] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    loadFeaturedProducts();
  }, []);

  const loadFeaturedProducts = async () => {
    setIsLoading(true);
    try {
      const products = await Product.list("-created_date", 6);
      setFeaturedProducts(products);
      setSearchResults(products);
    } catch (error) {
      console.error("Error loading products:", error);
    }
    setIsLoading(false);
  };

  const handleAddToCart = async (product) => {
    console.log("Added to cart:", product);
    // Cart functionality will be implemented in Cart page
  };

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative px-6 py-16 lg:py-24">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <Badge className="bg-emerald-100 text-emerald-800 font-semibold mb-4 px-4 py-2">
                <Sparkles className="w-4 h-4 mr-2" />
                AI-Powered Fresh Shopping
              </Badge>
              <h1 className="text-4xl lg:text-6xl font-bold text-emerald-900 mb-6 leading-tight">
                Welcome to{" "}
                <span className="bg-gradient-to-r from-emerald-600 to-emerald-800 bg-clip-text text-transparent">
                  Sisi
                </span>
              </h1>
              <p className="text-xl text-gray-600 max-w-2xl mx-auto leading-relaxed">
                Smart supermarket with AI recommendations, fresh organic produce, 
                and personalized shopping experiences tailored just for you.
              </p>
            </motion.div>
          </div>

          {/* Smart Search */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="max-w-3xl mx-auto mb-16"
          >
            <SmartSearch 
              onSearchResults={setSearchResults}
              products={featuredProducts}
            />
          </motion.div>

          {/* Features Grid */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="grid md:grid-cols-3 gap-6 mb-16"
          >
            <div className="bg-white/60 backdrop-blur-sm p-6 rounded-2xl sisi-shadow text-center">
              <div className="w-12 h-12 bg-emerald-100 rounded-xl mx-auto mb-4 flex items-center justify-center">
                <Zap className="w-6 h-6 text-emerald-600" />
              </div>
              <h3 className="font-bold text-lg text-emerald-800 mb-2">AI-Powered Search</h3>
              <p className="text-gray-600">Find products with natural language and get smart recommendations</p>
            </div>
            
            <div className="bg-white/60 backdrop-blur-sm p-6 rounded-2xl sisi-shadow text-center">
              <div className="w-12 h-12 bg-green-100 rounded-xl mx-auto mb-4 flex items-center justify-center">
                <Leaf className="w-6 h-6 text-green-600" />
              </div>
              <h3 className="font-bold text-lg text-emerald-800 mb-2">Fresh & Organic</h3>
              <p className="text-gray-600">Premium quality organic products sourced from local farms</p>
            </div>
            
            <div className="bg-white/60 backdrop-blur-sm p-6 rounded-2xl sisi-shadow text-center">
              <div className="w-12 h-12 bg-amber-100 rounded-xl mx-auto mb-4 flex items-center justify-center">
                <Star className="w-6 h-6 text-amber-600" />
              </div>
              <h3 className="font-bold text-lg text-emerald-800 mb-2">Premium Quality</h3>
              <p className="text-gray-600">Curated selection with customer reviews and ratings</p>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Featured Products */}
      <section className="px-6 py-12 bg-white/40 backdrop-blur-sm">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center justify-between mb-8">
            <div>
              <h2 className="text-3xl font-bold text-emerald-900 mb-2">Featured Products</h2>
              <p className="text-gray-600">Handpicked fresh items just for you</p>
            </div>
            <Link href={createPageUrl("Products")}>
              <Button variant="outline" className="font-semibold hover:bg-emerald-50 hover:text-emerald-700 hover:border-emerald-300">
                View All Products
                <ArrowRight className="w-4 h-4 ml-2" />
              </Button>
            </Link>
          </div>

          {isLoading ? (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {Array(6).fill(0).map((_, i) => (
                <div key={i} className="bg-white/60 rounded-2xl p-4 animate-pulse">
                  <div className="aspect-square bg-emerald-100 rounded-xl mb-4"></div>
                  <div className="space-y-2">
                    <div className="h-4 bg-emerald-100 rounded w-3/4"></div>
                    <div className="h-3 bg-emerald-100 rounded w-1/2"></div>
                    <div className="h-6 bg-emerald-100 rounded w-1/4 mt-4"></div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {searchResults.slice(0, 6).map((product, index) => (
                <ProductCard
                  key={product.id}
                  product={product}
                  onAddToCart={handleAddToCart}
                  index={index}
                />
              ))}
            </div>
          )}

          {searchResults.length === 0 && !isLoading && (
            <div className="text-center py-12">
              <ShoppingCart className="w-16 h-16 text-emerald-300 mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-gray-900 mb-2">No products found</h3>
              <p className="text-gray-600">Try adjusting your search or browse our categories</p>
            </div>
          )}
        </div>
      </section>

      {/* CTA Section */}
      <section className="px-6 py-16 bg-gradient-to-r from-emerald-600 to-emerald-800">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-3xl lg:text-4xl font-bold text-white mb-4">
              Ready to Start Smart Shopping?
            </h2>
            <p className="text-emerald-100 text-lg mb-8">
              Experience AI-powered grocery shopping with personalized recommendations
            </p>
            <Link href={createPageUrl("Products")}>
              <Button size="lg" className="bg-white text-emerald-800 hover:bg-emerald-50 font-bold px-8 py-4 rounded-xl sisi-hover">
                <ShoppingCart className="w-5 h-5 mr-2" />
                Start Shopping Now
              </Button>
            </Link>
          </motion.div>
        </div>
      </section>
    </div>
  );
}