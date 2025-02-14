import { auth } from "@/auth";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Metadata } from "next";
import { redirect } from "next/navigation";
import CredentialSignInForm from "./credentials-signin-form";
import SeparatorWithOr from "@/components/shared/separator-or";
import { APP_NAME } from "@/lib/constants";
import Link from "next/link";
import { Button } from "@/components/ui/button";


export const metadata: Metadata = {
  title: 'Войти'
}

export default async function SignIn(props: {
  searchParams: Promise<{
    callbackUrl: string
  }>
}) {
  const seacrhParams = await props.searchParams

  const { callbackUrl = '/' } = seacrhParams

  const session = await auth()
  if (session) {
    return redirect(callbackUrl)
  }

  return (
    <div className="w-full">
      <Card>
        <CardHeader>
          <CardTitle className="text-2xl">Войти</CardTitle>
        </CardHeader>
        <CardContent>
          <div>
            <CredentialSignInForm />
          </div>
        </CardContent>
      </Card>
      <SeparatorWithOr>Новый для {APP_NAME}?</SeparatorWithOr>

      <Link href={`/sign-up?callbackUrl=${encodeURIComponent(callbackUrl)}`}>
        <Button className="w-full" variant='outline'>
          Создай свой {APP_NAME} аккаунт
        </Button>
      </Link>
    </div>
  )
}