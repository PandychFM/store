import { APP_NAME } from "@/lib/constants";
import Link from "next/link";
import React from "react";

export default function CheckoutFooter() {
  return (
    <div className="border-t-2 space-y-2 my-4 py-4">
      <p>
        Нужна помощь? Проверьте наши{" "}
        <Link href="/page/help">Справочный центр</Link> или{" "}
        <Link href="/page/contact-us">Контакты</Link>{" "}
      </p>
      <p>
        Для товара, заказанного в {APP_NAME} Когда вы нажимаете на кнопку
        &apos;Оплатить&apos;, мы отправим вам электронное письмо с
        подтверждением получение вашего заказа. Ваш контракт на покупку товара
        не будет завершен до тех пор, пока мы не отправим вам электронное письмо
        с уведомлением о том, что товар вам отправлен. Размещая свой заказ, вы
        соглашаетесь с {APP_NAME}{" "}
        <Link href="/page/privacy-policy">политика конфиденциальности</Link> и 
        <Link href="/page/conditions-of-use"> условия использования</Link>.
      </p>
      <p>
        В течение 30 дней с момента доставки вы можете вернуть новый,
        нераспечатанный товар в его первоначальном состоянии. Применяются
        исключения и ограничения.{" "}
        <Link href="/page/returns-policy">
          Смотреть {APP_NAME} политика возврата товаров.
        </Link>
      </p>
    </div>
  );
}
