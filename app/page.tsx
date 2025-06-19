'use client'; 

import React, { useState } from 'react';
import { Table, TableHeader, TableBody, TableRow, TableHead, TableCell } from '@/components/ui/table';
import { Input } from '@/components/ui/input';

// Initial data extracted and parsed from the provided Markdown table.
// Empty cells from the Markdown table are treated as 0 for numerical operations.
const initialProductData = [
  { Name: 'Små Sure Hindbær 16,4%, Shotsrør, 0,02 l., 50', SF206928: 60, SF206956: 5, SF206958: 5, SF207124: 0, SF207170: 20, SF207258: 1, SF207261: 1, SF207299: 5, SK204287: 0, SK204288: 0, SK204309: 0, SK204334: -21 },
  { Name: 'Brick Gin Organic, Pap, 10 l, 1 stk', SF206928: 3, SF206956: 0, SF206958: 0, SF207124: 6, SF207170: 0, SF207258: 0, SF207261: 1, SF207299: 2, SK204287: 0, SK204288: 0, SK204309: 0, SK204334: -1 },
  { Name: 'Bad Dog Orange Liqueur 10 L. Øko, 1 stk.', SF206928: 1, SF206956: 0, SF206958: 0, SF207124: 2, SF207170: 0, SF207258: 0, SF207261: 0, SF207299: 0, SK204287: 0, SK204288: 0, SK204309: 0, SK204334: 0 },
  { Name: 'BITE Raspberry, Strawberry Buchu Syrup 5 l. Ø', SF206928: 4, SF206956: 0, SF206958: 0, SF207124: 4, SF207170: 0, SF207258: 0, SF207261: 1, SF207299: 2, SK204287: 0, SK204288: 0, SK204309: 0, SK204334: -7 },
  { Name: 'BITE Mango & Miso Syrup 5 l. Øko, 1 stk.', SF206928: 4, SF206956: 0, SF206958: 0, SF207124: 4, SF207170: 0, SF207258: 0, SF207261: 1, SF207299: 2, SK204287: 0, SK204288: 0, SK204309: 0, SK204334: -4 },
  { Name: 'Bad Dog Orange Liqueur 0.7 L. Øko, 6 stk.', SF206928: 1, SF206956: 0, SF206958: 0, SF207124: 0, SF207170: 0, SF207258: 0, SF207261: 1, SF207299: 1, SK204287: 0, SK204288: 0, SK204309: 0, SK204334: -2 },
  { Name: 'Råstoff Pure Licorice Shotrør Øko 16,4%, 2 cl', SF206928: 60, SF206956: 5, SF206958: 5, SF207124: 0, SF207170: 20, SF207258: 1, SF207261: 1, SF207299: 0, SK204287: 0, SK204288: 0, SK204309: 0, SK204334: 0 },
  { Name: 'Great Dane Dark Rum 0.7 l. 40% Øko, 6 stk.', SF206928: 5, SF206956: 0, SF206958: 0, SF207124: 0, SF207170: 0, SF207258: 0, SF207261: 1, SF207299: 2, SK204287: 0, SK204288: 0, SK204309: 0, SK204334: 0 },
  { Name: 'Great Dane Dark Rum 10 l. 40% Øko, 1 stk.', SF206928: 2, SF206956: 0, SF206958: 0, SF207124: 4, SF207170: 0, SF207258: 0, SF207261: 1, SF207299: 2, SK204287: 0, SK204288: 0, SK204309: 0, SK204334: 0 },
  { Name: 'MANA Lemon & Ginger Øko, dåse, 0.25 l., 24 st', SF206928: 10, SF206956: 5, SF206958: 5, SF207124: 0, SF207170: 20, SF207258: 0, SF207261: 2, SF207299: 5, SK204287: 0, SK204288: -20, SK204309: 0, SK204334: -17 },
  { Name: 'MANA Tropical Passion Øko, dåse, 0.25 l., 24', SF206928: 10, SF206956: 5, SF206958: 5, SF207124: 0, SF207170: 20, SF207258: 0, SF207261: 0, SF207299: 5, SK204287: 0, SK204288: -20, SK204309: 0, SK204334: -11 },
  { Name: 'Svane Tranebær Saft øko, Pap, 1 l. 12 stk.', SF206928: 6, SF206956: 5, SF206958: 5, SF207124: 0, SF207170: 3, SF207258: 1, SF207261: 1, SF207299: 1, SK204287: 0, SK204288: -10, SK204309: 0, SK204334: 0 },
  { Name: 'Brick GIN 1,0 l. 37,5% Øko, 6stk', SF206928: 8, SF206956: 0, SF206958: 0, SF207124: 0, SF207170: 0, SF207258: 0, SF207261: 2, SF207299: 2, SK204287: 0, SK204288: 0, SK204309: 0, SK204334: -2 },
  { Name: 'øko Koskenkorva Vodka 37,5%, glas, 0.70 l., 1', SF206928: 7, SF206956: 5, SF206958: 5, SF207124: 0, SF207170: 0, SF207258: 0, SF207261: 4, SF207299: 2, SK204287: 0, SK204288: 0, SK204309: 0, SK204334: 0 },
  { Name: 'Barske Twisted med Skive, 1 stk.', SF206928: 6, SF206956: 5, SF206958: 5, SF207124: 0, SF207170: 3, SF207258: 1, SF207261: 1, SF207299: 0, SK204287: 0, SK204288: 0, SK204309: 0, SK204334: 0 },
  { Name: 'Maté Maté Ice Tea Øko, Dåse, 0.25 l. 24 stk.', SF206928: 22, SF206956: 5, SF206958: 5, SF207124: 0, SF207170: 20, SF207258: 12, SF207261: 2, SF207299: 5, SK204287: 0, SK204288: 0, SK204309: -12, SK204334: -2 },
  { Name: 'Agave 40 % Øko, Glas, 0,7 L. 6 stk', SF206928: 4, SF206956: 0, SF206958: 0, SF207124: 5, SF207170: 0, SF207258: 0, SF207261: 1, SF207299: 2, SK204287: 0, SK204288: 0, SK204309: 0, SK204334: 0 },
  { Name: 'Skotlander Whisky 40 % Øko, Glas, 0,7 L. 6 st', SF206928: 4, SF206956: 0, SF206958: 0, SF207124: 3, SF207170: 0, SF207258: 0, SF207261: 1, SF207299: 2, SK204287: 0, SK204288: 0, SK204309: 0, SK204334: 0 },
  { Name: 'Fritz Kola Øko, glas, 0.33 l., 24 Stk.', SF206928: 15, SF206956: 5, SF206958: 5, SF207124: 5, SF207170: 20, SF207258: 1, SF207261: 1, SF207299: 15, SK204287: 0, SK204288: 0, SK204309: 0, SK204334: 0 },
  { Name: 'Fritz-Spritz Rabarber Øko, glas, 0.33 l., 24', SF206928: 15, SF206956: 5, SF206958: 5, SF207124: 0, SF207170: 20, SF207258: 1, SF207261: 1, SF207299: 5, SK204287: 0, SK204288: 0, SK204309: 0, SK204334: 0 },
  { Name: 'Naturfrisk Lemonbrus, Øko, glas, 0.25 l., 12', SF206928: 70, SF206956: 5, SF206958: 5, SF207124: 60, SF207170: 20, SF207258: 1, SF207261: 1, SF207299: 70, SK204287: 0, SK204288: 0, SK204309: 0, SK204334: 0 },
  { Name: 'Nyborg Distilleri Kaffelikør Øko, glasflaske,', SF206928: 0, SF206956: 5, SF206958: 5, SF207124: 2, SF207170: 0, SF207258: 0, SF207261: 0, SF207299: 0, SK204287: 0, SK204288: 0, SK204309: -5, SK204334: 0 },
  { Name: 'Fritz Kola Sukkerfri, glas, 0.33 l., 24 stk.', SF206928: 0, SF206956: 0, SF206958: 0, SF207124: 0, SF207170: 0, SF207258: 0, SF207261: 1, SF207299: 0, SK204287: 0, SK204288: 0, SK204309: 0, SK204334: 0 },
  { Name: 'Michael Bitter Øko, Glas, 0,5 L, 6 stk', SF206928: 0, SF206956: 0, SF206958: 0, SF207124: 0, SF207170: 0, SF207258: 0, SF207261: 0, SF207299: 0, SK204287: -12, SK204288: -12, SK204309: -12, SK204334: 0 },
];

const columnHeaders = [
  'Name', 'SF206928', 'SF206956', 'SF206958', 'SF207124', 'SF207170', 'SF207258', 'SF207261', 'SF207299',
  'SK204287', 'SK204288', 'SK204309', 'SK204334', 'Total Net Quantity'
];

type ProductData = {
  Name: string;
  SF206928: number;
  SF206956: number;
  SF206958: number;
  SF207124: number;
  SF207170: number;
  SF207258: number; 
  SF207261: number;
  SF207299: number;
  SK204287: number;
  SK204288: number;
  SK204309: number;
  SK204334: number;
};

export default function Home() {
  const [products, setProducts] = useState<ProductData[]>(initialProductData);

  // Memoized function to calculate the total net quantity for a given product row
  const calculateTotalNetQuantity = React.useCallback((product: ProductData) => {
    let total = 0;
    for (const key in product) {
      // Ensure the key is a direct property of the product and is not 'Name'
      if (key !== 'Name' && product.hasOwnProperty(key)) {
        const value = product[key as keyof ProductData];
        if (typeof value === 'number') {
          total += value;
        }
      }
    }
    return total;
  }, []);

  // Handler for when a quantity input field changes
  const handleQuantityChange = React.useCallback((
    productName: string, 
    columnKey: keyof ProductData,
    newValue: string 
  ) => {
    setProducts(prevProducts =>
      prevProducts.map(product => {
        if (product.Name === productName) {
          const parsedValue = parseInt(newValue, 10);
          return {
            ...product, 
            [columnKey]: isNaN(parsedValue) ? 0 : parsedValue, 
          };
        }
        return product; 
      })
    );
  }, []);

  return (
    <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
      <main className="flex flex-col gap-[32px] row-start-2 items-center sm:items-start w-full">
        <h1 className="text-2xl sm:text-3xl font-bold text-gray-800 mb-4 sm:mb-6 p-3 bg-white rounded-lg shadow-sm">
          Producentmængder Oversigt (Fakturaer & Kreditnotaer)
        </h1>
        <div className="rounded-lg border shadow-lg overflow-x-auto bg-white w-full">
          <Table>
            <TableHeader>
              <TableRow className="bg-blue-600 text-white hover:bg-blue-700">
                {columnHeaders.map(header => (
                  <TableHead key={header} className="whitespace-nowrap px-4 py-3 text-left text-xs sm:text-sm font-semibold uppercase tracking-wider rounded-tl-md">
                    {header}
                  </TableHead>
                ))}
              </TableRow>
            </TableHeader>
            <TableBody>
              {products.map((product, index) => (
                <TableRow key={index} className="border-b last:border-b-0 hover:bg-gray-100">
                  <TableCell className="font-medium text-gray-900 whitespace-nowrap p-4 rounded-bl-md">
                    {product.Name}
                  </TableCell>
                  {/* Dynamically render editable cells for each invoice/credit note column */}
                  {columnHeaders.slice(1, -1).map(header => ( // Slice to exclude 'Name' and 'Total Net Quantity'
                    <TableCell key={`${product.Name}-${header}`} className="p-2">
                      <Input
                        type="number" // Ensure numeric input
                        value={product[header as keyof ProductData]}
                        onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                          handleQuantityChange(product.Name, header as keyof ProductData, e.target.value)
                        }
                        className="w-20 sm:w-24 text-center text-gray-800 border-gray-300 focus:border-blue-500 focus:ring-blue-500 rounded-md"
                      />
                    </TableCell>
                  ))}
                  {/* Render the calculated Total Net Quantity, which is read-only */}
                  <TableCell className="font-bold text-gray-900 bg-blue-50 text-center p-4 rounded-br-md">
                    {calculateTotalNetQuantity(product)}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </main>
    </div>
  );
}
