import React from 'react'
import ShoppingCart from './ShoppingCart';
import { render,screen } from "@testing-library/react";

const plants = [{name:"cactus",id:1,img:'cactus'},{name:"lily",id:2,img:lily},{name:"rose",id:3,img:"rose"}]// with each object being a mock plant
test("displays plants in cart", () => {
  render(<ShoppingCart cart = {plants}/>)

})