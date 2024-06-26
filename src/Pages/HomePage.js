import React from 'react';
import QuestionList from "../Components/QuestionList";
import classes from "./HomePage.module.css";

const data = [
  {
      "title" : "Reverse a String",
      "description" : "Write a function that reverses a string.",
      "tags" : ["easy","string"],
      "testCase" : ["abs","bcd","aabaa","abcd","qwer"],
      "answer" : ["sba","dcb","aabaa","dcba","rewq"]
  },
  {
      "title" : "ODD or Even",
      "description" : "Write a program that take a input and tells wether input is odd or even.",
      "tags" : ["hard"],
      "testCase" : ["1","2","134","567","45244"],
      "answer" : ["ODD","EVEN","EVEN","ODD","EVEN"]
  },
  {
      "title" : "Sum of numbers in given range",
      "description" : "Write a function that takes two input and given the sum of numbers between them (both inclusive).",
      "tags" : ["medium","Number Theory"],
      "testCase" : ["1 2","1 5","10 15","1 10","1 1"],
      "answer" : ["3","15","75","55","1"]
  }
]

export default function HomePage() {
  return (    
    <div className={classes.wrapper}>
      {data.map((q,idx)=>(
        <QuestionList question={q} num = {idx+1} key ={idx}></QuestionList>
      ))}      
    </div>
  )
}


