
import React, { useState, useEffect } from 'react';
import { ReadingTime } from '../Words/ReadingTime';

export default function PostCard({ post, RTime }) {
  const date = new Date(post.createdAt).toLocaleString();

  const stripHtmlTags = (str) => {
    if ((str === null) || (str === ''))
      return false;
    else
      str = str.toString();
    return str.replace(/<[^>]*>/g, ' ');
  }
  
  const postBodyPreview = () => {
    const strippedBody = stripHtmlTags(post.body);
    const words = strippedBody.split(' ');
    const maxLength = 8;
    return (
      words.slice(0, maxLength).join(' ') +
      (words.length > maxLength ? '...' : '')
    );
  };
  

  return (
    <>
      <div style={{border: '2px solid grey', borderOpacity: '0.3'}} className="w-[405px] h-[420px] relative bg-white rounded-xl border border-black border-opacity-70">
        <div className="w-[380px] h-[400px] left-[13px] top-[10px] absolute bg-white" />
        <div className="w-[120px] h-[92px] left-[43px] top-[105px] absolute text-stone-900 text-opacity-80 text-sm font-medium font-['Inter']">
              <div dangerouslySetInnerHTML={{ __html: postBodyPreview() }}></div>
        </div>
        <div className="w-[147px] left-[33px] top-[24px] absolute text-stone-900 text-sm font-bold font-['Inter']">
          {post.title}
        </div>
        <img className="w-[190px] h-[auto] left-[207px] top-[10px] absolute rounded-[10px]" src={post.imgUrl ? post.imgUrl : 'https://via.placeholder.com/190x400'} alt="Post" />
        <div className="px-2 py-2 left-[312px] top-[370px] absolute bg-sky-500 rounded-md border border-black border-opacity-70 justify-center items-center gap-2.5 inline-flex">
          <div className="text-black text-xs font-normal font-['Inter']">Read More</div>
        </div>
        <div className="h-[76px] px-2 left-[2px] top-[330px] absolute flex-col justify-start items-start gap-[5px] inline-flex">
          <div className="w-[165px] justify-between items-center inline-flex">
            <div className="text-black text-xs font-normal font-['Inter']">{post.likes}      </div>
            <div className="text-black text-xs font-normal font-['Inter']"> ❤️</div>
          </div>
          <div className="w-[165px] justify-between items-start inline-flex">
            <div className="text-black text-xs font-normal font-['Inter']">Comments</div>
            <div className="text-stone-900 text-xs font-normal font-['Inter']">{post.comments.length}</div>
          </div>
          <div className="w-[163px] justify-between items-start inline-flex">
            <div className="text-black text-xs font-normal font-['Inter']">Date:</div>
            <div className="text-stone-900 text-xs font-normal font-['Inter']">{new Date(date).toLocaleDateString('es-ES')}</div>
          </div>
          <div className="text-stone-900 text-opacity-70 text-xs font-normal font-['Inter']">
          <ReadingTime text={post.body} />
          </div>
        </div>
      </div>
    </>
  );
}
