'use client'

import { UserSignInSchema } from "@/lib/validator"
import { IUserSignIn } from "@/types"
import { redirect, useSearchParams } from "next/navigation"
import { useForm } from "react-hook-form"
import { zodResolver } from '@hookform/resolvers/zod'
import { signInWithCredetials } from "@/lib/actions/user.actions"
import { isRedirectError } from "next/dist/client/components/redirect-error"
import { toast } from "@/hooks/use-toast"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { APP_NAME } from "@/lib/constants"
import Link from "next/link"

const signInDefaultValues =
  process.env.NODE_ENV === 'development'
   ? {
      email: 'admin@example.com',
      password: '123456',
    }
  : {
      email: '',
      password: '', 
    }

export default function CredentialSignInForm() {
  const searchParams = useSearchParams()
  const callbackUrl = searchParams.get('callbackUrl') || '/'

  const form = useForm<IUserSignIn>({
    resolver: zodResolver(UserSignInSchema),
    defaultValues: signInDefaultValues,
  })

  const { control, handleSubmit } = form

  const onSubmit = async (data: IUserSignIn) => {
    try {
      await signInWithCredetials({
        email: data.email,
        password: data.password,
      })
      redirect(callbackUrl)
    } catch (error) {
      if (isRedirectError(error)) {
        throw error
      }
      toast({
        title: 'Ошибка',
        description: 'Не правильный пароль или почта',
        variant: 'destructive'
      })
    }
  }

  return (
    <Form {...form}>
      <form onSubmit={handleSubmit(onSubmit)}>
        <input type="hidden" name='callbackUrl' value={callbackUrl} />
        <div className="space-y-6">
          <FormField
            control={control}
            name='email'
            render={({ field }) => (
              <FormItem className="w-full">
                <FormLabel>Почта</FormLabel>
                <FormControl>
                  <Input placeholder="Введите свой почту" {...field} />
                </FormControl>
              </FormItem>
            )}
          />

          <FormField
            control={control}
            name='password'
            render={({ field }) => (
              <FormItem className="w-full">
                <FormLabel>Пароль</FormLabel>
                <FormControl>
                  <Input
                    type="password"
                    placeholder="Введите пароль"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <div>
            <Button type="submit">Войти</Button>
          </div>
          <div className="text-sm">
          Регистрируясь, вы соглашаетесь с {APP_NAME}&apos;{' '}
          <Link href='/page/conditions-of-use'>Условия использования</Link> и{' '}
          <Link href='/page/privacy-policy'>Политика конфиденциальности.</Link>
          </div>
        </div>
      </form>
    </Form>
  )
}