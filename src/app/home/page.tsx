"use client";

import { useEffect, useState } from "react";
import { useGetPuuidQuery } from "@/services/riotApi";
import * as Models from "@/types/models";

export default function Page() {
  const[name, setName] = useState<Models.AccountDto>();
  const {data} = useGetPuuidQuery<Models.AccountDto>({gameName:"nevrOoz", tagline:"euw"})

  useEffect(()=>{
    if(data) setName(data)
  },[data])
  return (
    <>
      {name && name.gameName + " la3in"}
    </>
  );
}
