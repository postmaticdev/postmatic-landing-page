"use client";

import { MacWindow } from "./custom/mac-window";
import { Product } from "@/models/product";
import { ProductCard } from "./custom/product-card";
import { useState } from "react";
import { ProductModal } from "./custom/product-modal";
import { useTranslations } from "next-intl";

export default function ProductShowcase() {
  const t = useTranslations("productShowcase");
  const products: Product[] = t.raw("products") as unknown as Product[];
  const [selectedProduct, setSelectedProduct] = useState<
    (typeof products)[0] | null
  >(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openProductModal = (product: (typeof products)[0]) => {
    setSelectedProduct(product);
    setIsModalOpen(true);
  };
  const closeProductModal = () => {
    setIsModalOpen(false);
  };

  return (
    <section id="about" className="relative">
      <div className="text-center mb-7">
        <h2 className="text-4xl font-bold text-gray-900 dark:text-white mb-6">
          <span className="bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
            Postmatic
          </span>{" "}
          Showcase
        </h2>
      </div>
      <MacWindow
        hoverZoom={false}
        title="Product Showcase"
        className="max-w-4xl mx-auto"
      >
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 max-w-4xl mx-auto ">
          {products.map((product: Product, index: number) => (
            <div
              key={product.id}
              className="animate-fade-in"
              style={{ animationDelay: `${0.8 + index * 0.1}s` }}
            >
              <ProductCard product={product} onClick={openProductModal} />
            </div>
          ))}
        </div>
      </MacWindow>

      <ProductModal
        isOpen={isModalOpen}
        onClose={closeProductModal}
        product={selectedProduct}
      />
    </section>
  );
}
