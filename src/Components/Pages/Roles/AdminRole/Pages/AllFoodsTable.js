/* eslint-disable no-restricted-globals */
import { useEffect, useState } from "react";
import { ImPriceTags } from "react-icons/im";
import swal from "sweetalert";
import UpdateSingleFood from "../Modals/updateSingleFood";

const AllFoodsTable = ({ food, index, setAllFoods, key }) => {
  const {foodId, name, price, img} = food;
  let imgUrl;
  const [isOpen, setIsOpen] = useState(false);
  //   const handleGetUpdate = async()=> {
  //    ;

  //   }
  // const handleButtonClick = () => {
  //   // Perform any additional actions before or instead of form submission
  //   console.log('Button clicked');
  // };

  const onUpdate = async (food) => {
    const imageStorageKey = "52a7c30a95d000395b196c985adb3c83";
    const {foodId, name, price, imageFormData } = food;

    console.log("imageFormData", imageFormData)
    
    if(imageFormData.size > 0){
      const url = `https://api.imgbb.com/1/upload?key=${imageStorageKey}`;
      const res = await fetch(url, {
        method: "POST",
        body: imageFormData,
      });
      const data = await res.json();
      if(data.success){
        imgUrl = data.data.url
      }
    }

    if (!foodId || !name || !price) {
      alert("You must enter food id, name and price uploading image is optional");
      return;
    }

    const data = {
      foodId: foodId,
      name: name,
      price: price,
    }

    if(imgUrl != undefined){
      data.img = imgUrl;
    }

    await fetch(
      `${process.env.REACT_APP_API_SERVER_URL}/foods/${foodId}`,
      {
        method: "PUT",
        headers: {
          "content-type": "application/json",
        },
        body: JSON.stringify(data),
      }
    )
      .then((res) => res.json())
      .then((data) => {
        swal({
          title: "Food Updated Successful!",
          text: "Updated Food successfully!",
          icon: "success",
          button: "Ok",
        });
      });

      //this api is called for refresh updated
    fetch(
      `${process.env.REACT_APP_API_SERVER_URL}/foods/all-foods`
      )
      .then((res) => res.json())
      .then((data) => {
        setAllFoods(data?.data); 
        closeUpdateModal()
      });
  };

  const showUpdateModal = () => {
    setIsOpen(true);
  };
  const closeUpdateModal = () => {
    setIsOpen(false);
  };

  const handleDeleteOrder = async (foodId) => {
    // alert(`Clicked on ${roomId}`)
    swal({
      title: "Are you sure?",
      text: "Once deleted, you will not be able to recover this!",
      icon: "warning",
      buttons: true,
      dangerMode: true,
    }).then(async (willDelete) => {
      if (willDelete) {
        const url = `${process.env.REACT_APP_API_SERVER_URL}/foods/${foodId}`;
        await fetch(url, {
          method: "DELETE",
        })
          .then((res) => res.json())
          .then((data) => console.log(data));
        swal("The Food is Deleted", {
          icon: "success",
        });

        //this second fetched is use to refresh delete data
        await fetch(
          `${process.env.REACT_APP_API_SERVER_URL}/foods/all-foods`
        )
          .then((res) => res.json())
          .then((data) => setAllFoods(data?.data));
      } else {
        swal("Oder not deleted. You canceled it!");
      }
    });
  };

  return (
    <tr>
      <th>{index + 1}</th>
      <td>
        <img className="w-10 xl:w-32 xl:h-20 rounded " src={img} alt="" />
      </td>
      <td>{name}</td>
      <td>Ksh. {price}</td>
      <td className="">
        <button
          onClick={() => {
            handleDeleteOrder(foodId);
          }}
          className="btn btn-error btn-sm btn-outline hover:text-base-200"
        >
          Delete Food
        </button>
        <button
          onClick={() => showUpdateModal()}
          className="btn btn-success btn-sm btn-outline ml-2"
        >
          Update Food
        </button>
      </td>
      
      <UpdateSingleFood onUpdate={onUpdate} food={food} isOpen={isOpen} onClose={closeUpdateModal}/>
      
    </tr>
  );
};

export default AllFoodsTable;
