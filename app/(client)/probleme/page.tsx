import React from 'react'

import { notFound } from "next/navigation";

const page = () => {
  notFound();
  return (
    <div>page</div>
  )
}

export default page