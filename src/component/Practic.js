import React, { useEffect, useState } from "react";
import { AiOutlineFieldNumber } from "react-icons/ai";

const Practic = () => {
  const [url, setUrl] = useState("");
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [products, setProducts] = useState([]);
  const [save, setSave] = useState(null);
  const addTask = () => {
    if (url === "" || name === "" || price === "") {
      alert("заполните пустое место!!!");
    } else if (products.some((el) => el.marka === name)) {
      alert("такое продук уже существует!!!");
    } else {
      let newTask = {
        id: products.length ? products[products.length - 1].id + 1 : 1,
        img: url,
        marka: name,
        mani: price,
      };
      let task = JSON.parse(localStorage.getItem("red")) || [];
      task.push(newTask);
      localStorage.setItem("red", JSON.stringify(task));
      readTask();
      setUrl("");
      setName("");
      setPrice("");
    }
  };
  const readTask = () => {
    let task = JSON.parse(localStorage.getItem("red")) || [];
    setProducts(task);
  };

  const KeyDown = (e) => {
    if (e.key === "Enter") {
      addTask();
    }
  };

  const deleteTask = (btn) => {
    localStorage.setItem(
      "red",
      JSON.stringify([...products.filter((el) => el.id !== btn)])
    );
    readTask();
  };

  const editProduct = (data) => {
    setUrl(data.img);
    setName(data.marka);
    setPrice(data.mani);
    setSave(data.id);
  };

  const reatodo = (proId) => {
    let task = JSON.parse(localStorage.getItem("red")) || [];
    task = products.map((el, idx, arr) => {
      return el.id === proId
        ? { ...el, img: url, marka: name, mani: price }
        : el;
    });
    localStorage.setItem("red", JSON.stringify(task));
    readTask()
    setUrl("")
    setName("")
    setPrice("")
    setSave(null)
  };

  useEffect(() => {
    readTask();
  }, []);

  return (
    <div className="container ">
      <form className="flex items-center  justify-center flex-col gap-4 mt-[90px] ">
        <label for="voice-search" className="sr-only">
          Search
        </label>
        <div className="relative w-[50%] flex items-center justify-center flex-col gap-3">
          <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none"></div>
          <input
            onKeyDown={(e) => KeyDown(e)}
            value={url}
            onChange={(e) => setUrl(e.target.value)}
            type="text"
            id="voice-search"
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full ps-10 p-2.5  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            placeholder="Name marki..."
          />
          <input
            maxLength={10}
            onKeyDown={(e) => KeyDown(e)}
            value={name}
            onChange={(e) => setName(e.target.value)}
            type="text"
            id="voice-search"
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full ps-10 p-2.5  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            placeholder="name..."
          />
          <input
            onKeyDown={(e) => KeyDown(e)}
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            type="text"
            id="voice-search"
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full ps-10 p-2.5  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            placeholder="$..."
          />
        </div>
        <button
          onClick={save ? () => reatodo(save) : () => addTask()}
          class="relative inline-flex items-center justify-center p-0.5 mb-2 me-2 overflow-hidden text-sm font-medium text-gray-900 rounded-lg group bg-gradient-to-br from-purple-600 to-blue-500 group-hover:from-purple-600 group-hover:to-blue-500 hover:text-white dark:text-white focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800"
        >
          <span class="relative px-5 py-2.5 transition-all ease-in duration-75 bg-white dark:bg-gray-900 rounded-md group-hover:bg-opacity-0">
            {save ? "saveProduct" : "addProduct"}
          </span>
        </button>
      </form>
      {!products.length ? (
        <div
          class="p-4 mb-4 mt-4 ml-96 w-[50%] text-center text-xl text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400"
          role="alert"
        >
          <span class="font-medium">заполните пустое место!!!</span>
        </div>
      ) : (
        <div class="relative overflow-x-auto shadow-md sm:rounded-lg flex items-center justify-center mt-3">
          <table class="w-[60%] text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
            <thead class="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
              <tr>
                <th scope="col" class="px-6 py-3 text-2xl">
                  <AiOutlineFieldNumber />
                </th>
                <th scope="col" class="px-6 py-3">
                  Color
                </th>
                <th scope="col" class="px-6 py-3">
                  Category
                </th>
                <th scope="col" class="px-6 py-3">
                  Price
                </th>
                <th scope="col" class="px-6 py">
                  edit
                </th>
                <th scope="col" class="px-6 py-3">
                  Action
                </th>
              </tr>
            </thead>
            <tbody>
              {
              products.map((el, idx, arr) => (
                <tr class="odd:bg-white odd:dark:bg-gray-900 even:bg-gray-50 even:dark:bg-gray-800 border-b dark:border-gray-700 ">
                  <th
                    scope="row"
                    class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white flex items-center justify-center mt-7"
                  >
                    {idx + 1}
                  </th>
                  <td class="px-6 py-4 ">
                    <img src={el.img} alt="img" width={100} />
                  </td>
                  <td class="px-6 py-4">{el.marka}</td>
                  <td class="px-6 py-4">{el.mani} $</td>
                  <td>
                    <button
                      onClick={() => editProduct(el)}
                      type="button"
                      class="text-gray-900 bg-gradient-to-r from-lime-200 via-lime-400 to-lime-500 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-lime-300 dark:focus:ring-lime-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2"
                    >
                      edit
                    </button>
                  </td>
                  <td>
                    <button
                      onClick={() => deleteTask(el.id)}
                      type="button "
                      class="text-white  w-[96]mt-3 bg-yellow-400 hover:bg-yellow-500 focus:outline-none focus:ring-4 focus:ring-yellow-300 font-medium rounded-full text-sm px-5 py-2.5 text-center me-2 mb-2 dark:focus:ring-yellow-900"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default Practic;
