'use client';

import { useState } from 'react';

/* JSX Examples */

function HelloWorld() {
  return (
    <div>Hello World!</div>
  );
}

function StaticButton() {
  return (
    <button>I&apos;m a button</button>
  );
}

function Profile() {

  const user = {
    name: 'Hedy Lamarr',
    imageUrl: 'https://i.imgur.com/yXOvdOSs.jpg',
    imageSize: 90,
  };

  return (
    <>
      <h1>{user.name}</h1>
      <img
        className="avatar"
        src={user.imageUrl}
        alt={'Photo of ' + user.name}
        style={{
          width: user.imageSize,
          height: user.imageSize
        }}
      />
    </>
  );

}

function ShoppingList() {

  const products = [
    { title: 'Cabbage', isFruit: false, id: 1 },
    { title: 'Garlic', isFruit: false, id: 2 },
    { title: 'Apple', isFruit: true, id: 3 },
  ];
  
  const listItems = products.map(product =>
    <li key={product.id} style={{
      color: product.isFruit ? "blue" : "green"
    }}>
      {product.title}
    </li>
  );
  
  return (
    <ul>{listItems}</ul>
  );

}

/* Dynamic Examples */

function DynamicButton() {

  const [count, setCount] = useState(0);

  function handleClick() {
    setCount(count + 1);
  }

  return (
    <button onClick={handleClick}>
      I have been clicked {count} times, and update individually
    </button>
  );

}

function SharedStateButtons() {

  const [count, setCount] = useState(0);

  function handleClick() {
    setCount(count + 1);
  }

  return (
    <div>
      <SharedStateButton count={count} onClick={handleClick}/>
      <br></br>
      <SharedStateButton count={count} onClick={handleClick}/>
    </div>
  );

}

function SharedStateButton({ count, onClick }: any) {

  return (
    <button onClick={onClick}>
    I have been clicked {count} times, and update in a pair
    </button>
  );

}

/* App */

export default function App() {
  return (
    <div>
      <HelloWorld /><br></br>
      <StaticButton /><br></br><br></br>
      <Profile /><br></br>
      <ShoppingList /><br></br>
      <DynamicButton /><br></br>
      <DynamicButton /><br></br><br></br>
      <SharedStateButtons /><br></br>
    </div>
  );
}