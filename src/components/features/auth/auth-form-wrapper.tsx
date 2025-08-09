"use client";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import Image from "next/image";
import React from "react";

export const AuthFormWrapper = ({
  children,
  title,
  description,
}: {
  children: React.ReactNode;
  title: string;
  description?: React.ReactNode;
}) => {
  return (
    <Card>
      <CardHeader>
        <Image
          src="/logo.png"
          alt="logo track-dev-time"
          width={80}
          height={80}
          className="mx-auto"
        />
        <CardTitle className="sm:text-center">{title}</CardTitle>
        <CardDescription className="sm:text-center">
          {description}
        </CardDescription>
      </CardHeader>
      <CardContent>{children}</CardContent>
    </Card>
  );
};
