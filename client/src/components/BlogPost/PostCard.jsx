//import { ReadingTime } from '../Words/ReadingTime';

export default function PostCard({ post, RTime }) {
  const date = new Date(post.createdAt);

  const formattedDate = date.toLocaleString('en-US', {
    month: 'short', 
    day: 'numeric',  
    year: 'numeric'
  });
  
  console.log(RTime);
  

  const postBodyPreview = () => {
    const parser = new DOMParser();
    const doc = parser.parseFromString(post.body, 'text/html');
    const textContent = doc.body.textContent || '';
    const words = textContent.split(' ');
    const maxLength = 3;
    return (
      words.slice(0, maxLength).join(' ') +
      (words.length > maxLength ? '...' : '')
    );
};

  const postTitlePreview = () => {
    const words = post.title.split(' ');
    const maxLength = 5;
    return words.slice(0, maxLength).join(' ') + (words.length > maxLength ? '...' : '');
  };
  

  return (
    <>
      <div >
        <div className="w-[570px] h-[570px] rounded  border border-solid border-zinc-400">
          <div
            className="bg-cover bg-center"
            style={{
              backgroundImage: `url(${
                post.imgUrl ? post.imgUrl : 'https://picsum.photos/500/300'
              })`,
              height: '55%',
            }}
          ></div>

          <div className="bg-white flex flex-col items-start" >
            <p className='text-gray-600 text-xs ml-4'>{formattedDate}</p>
            <h1 className="text-2xl font-bold mb-1 flex ml-4">{postTitlePreview()}</h1>
            <p
              className="text-sm text-gray-600 my-2 flex ml-4 "
              style={{ maxHeight: '3rem' }}
            >
              {postBodyPreview()}
            </p>
            </div>  

            <div className="flex justify-between ml-4 mr-3 my-4">
              <div className="flex items-center gap-1 text-gray-600 text-xs">
                <p className="">{post.likes}</p>
                <img
                  className="shrink-0"
                  src="/heart-icon.svg"
                  alt="Expand Icon"
                  width={15}
                  height={15}
                />
                <p>{post.comments.length} Comments</p>
              </div>
              <div className="flex items-center text-xs gap-1">
              <p className="text-gray-600">x min read</p>
              <img
                  className="shrink-0"
                  src="/eye-icon.svg"
                  alt="Expand Icon"
                  width={20}
                  height={15}
                />
              </div>
              <div>
              <a
              href={`/post/${post._id}`}
              className="flex justify-center items-center shrink-0 sm:w-36 sm:h-10 w-12 h-4 bg-black text-white text-center text-large  rounded-[5px] no-underline"
            >
              Read more..
            </a>
            </div>
            </div>

        </div>
      </div>
    </>
  );
}
