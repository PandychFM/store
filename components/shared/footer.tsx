"use client";

import { ChevronUp } from "lucide-react";
import { Button } from "../ui/button";
import Link from "next/link";
import { APP_NAME } from "@/lib/constants";

export default function Footer() {
  return (
    <footer className="bg-black text-white underline-link">
      <div className="w-full">
        <Button
          variant="ghost"
          className="bg-gray-800 w-full rounded-none"
          onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
        >
          <ChevronUp className="mr-2 h-4 w-4" />
          Вернутся на верх
        </Button>
      </div>
      <div className="p-4">
        <div className="flex justify-center gap-3 text-sm">
          <Link href="page/conditions-of-use">Условия использования</Link>
          <Link href="page/privacy-policy">Политика конфиденциальности</Link>
          <Link href="page/help">Поддержка</Link>
        </div>
        <div className="flex justify-center text-sm">
          <p> © 2000-2024 {APP_NAME}, Все права защищены</p>
        </div>
        <div className="mt-8 flex justify-center text-sm text-gray-400">
          123, Москва, Россия, 123456 | +7 (123) 456-78-90
        </div>
      </div>
    </footer>
  );
}
