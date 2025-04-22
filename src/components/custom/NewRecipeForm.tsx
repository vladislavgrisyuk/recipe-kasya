"use client";

import React, { useState, useCallback } from "react";
import { useForm } from "react-hook-form";
import { useDropzone } from "react-dropzone";
import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlusCircle } from "@fortawesome/free-solid-svg-icons";

type NewRecipeFormValues = {
  title: string;
  description: string;
  photo: File | null;
  ingredientCount: number;
};

export function NewRecipeForm() {
  const form = useForm<NewRecipeFormValues>({
    defaultValues: {
      title: "",
      description: "",
      photo: null,
      ingredientCount: 1,
    },
  });

  const [preview, setPreview] = useState<string | null>(null);

  const onDrop = useCallback(
    (acceptedFiles: File[]) => {
      const file = acceptedFiles[0];
      if (file) {
        form.setValue("photo", file);
        const url = URL.createObjectURL(file);
        setPreview(url);
      }
    },
    [form]
  );

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: { "image/*": [] },
    maxFiles: 1,
  });

  function onSubmit(data: NewRecipeFormValues) {
    console.log(data);
    // TODO: отправка на сервер
  }

  return (
    <Form {...form} onSubmit={form.handleSubmit(onSubmit)}>
      <form className="space-y-6">
        {/* Заголовок */}
        <FormField
          control={form.control}
          name="title"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Заголовок рецепта</FormLabel>
              <FormControl>
                <Input placeholder="Введите название" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Описание */}
        <FormField
          control={form.control}
          name="description"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Описание</FormLabel>
              <FormControl>
                <Textarea placeholder="Краткое описание рецепта" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Фото */}
        <FormField
          control={form.control}
          name="photo"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Фото рецепта</FormLabel>
              <FormControl>
                <div
                  {...getRootProps()}
                  className={cn(
                    "flex items-center justify-center border-2 border-dashed rounded-lg h-40 cursor-pointer",
                    isDragActive
                      ? "border-accent bg-accent/10"
                      : "border-border bg-background"
                  )}
                >
                  <input {...getInputProps()} />
                  {preview ? (
                    <img
                      src={preview}
                      alt="Превью"
                      className="max-h-full object-contain"
                    />
                  ) : (
                    <p className="text-sm text-muted-foreground">
                      Перетащите фото или нажмите, чтобы выбрать файл
                    </p>
                  )}
                </div>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Кол-во ингредиентов */}
        <FormField
          control={form.control}
          name="ingredientCount"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Количество ингредиентов</FormLabel>
              <FormControl>
                <Input
                  type="number"
                  min={1}
                  {...field}
                  onChange={(e) => field.onChange(Number(e.target.value))}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <Button type="submit" className="w-full">
          Создать рецепт
          <FontAwesomeIcon icon={faPlusCircle} className="" />
        </Button>
      </form>
    </Form>
  );
}

export default NewRecipeForm;
