import { useEffect, useState } from "react";
import avatar from "../../assets/profile.jpg";
import Nav from "../../components/Nav";
import { FaFileUpload, FaTimesCircle } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { fetchShopProfile, updateShopProfile } from "../../redux/features/seller/shop/shopThunks";

const ShopProfile = () => {
  const dispatch = useDispatch();
  const profileState = useSelector((state) => state.shopProfile);
  const [profileData, setProfileData] = useState({});

  useEffect(() => {
    dispatch(fetchShopProfile());
  }, [dispatch]);

  useEffect(() => {
    if (profileState.profileData) {
      setProfileData(profileState.profileData);
    }
  }, [profileState.profileData]);

  const [product, setProduct] = useState({
    ShopName: "",
    ShopLocation: "",
    ShopDescription: "",
    imagePreviewUrl: "",
  });

  useEffect(() => {
    if (profileData) {
      setProduct({
        ShopName: profileData.store_name || "",
        ShopLocation: profileData.store_location || "",
        ShopDescription: profileData.store_desc || "",
        imagePreviewUrl: "",
      });
    }
  }, [profileData]);
  const [imageFile, setImageFile] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProduct({
      ...product,
      [name]: value,
    });
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    const reader = new FileReader();

    reader.onloadend = () => {
      setProduct({
        ...product,
        imagePreviewUrl: reader.result,
      });
      setImageFile(file);
    };

    if (file) {
      reader.readAsDataURL(file);
    }
  };

  const handleRemoveImage = () => {
    const input = document.getElementById("image");
    if (input) {
      input.value = "";
    }

    setProduct({
      ...product,
      imagePreviewUrl: "",
    });
    setImageFile(null);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const formData = new FormData();
    if (imageFile) {
      formData.append("img_store", imageFile);
    }
    formData.append("store_desc", product.ShopDescription);
    formData.append("store_location", product.ShopLocation);

    dispatch(updateShopProfile(formData));

    setProduct({
      ShopName: "",
      ShopLocation: "",
      ShopDescription: "",
      imagePreviewUrl: "",
    });
    setImageFile(null);
  };
  useEffect(() => {
    if (profileState.updateStatus === "succeeded") {
      window.location.reload();
    }
  }, [profileState.updateStatus]);
  return (
    <div className="flex">
      <Nav role="seller" />
      <div className="ml-0 lg:ml-64 p-4 mt-5 w-full font-roboto">
        <div className="mx-auto w-full">
          <h1 className="text-3xl font-bold mb-2 w-full mt-2 lg:mt-0">Profile</h1>
          {profileState.profileError && <p className="text-red-500">{profileState.profileError}</p>}
          <form onSubmit={handleSubmit}>
            <div className="mb-2 flex flex-col items-center">
              <div className="w-48 h-48 rounded-full overflow-hidden bg-gray-200 mb-2">
                <img src={product.imagePreviewUrl || profileData.store_img || avatar} alt="Profile picture" className="w-full h-full" />
              </div>
              <div className="flex items-center">
                <label className={`cursor-pointer ${product.imagePreviewUrl ? "hidden" : "bg-gray-200 hover:bg-gray-300"} text-gray-800 font-semibold py-2 px-4 rounded inline-flex items-center`} htmlFor="image">
                  <FaFileUpload className="w-4 h-4 mr-2" />
                  Change Image
                </label>
                <input type="file" id="image" name="image" accept="image/*" onChange={handleImageChange} className="hidden" />
                {product.imagePreviewUrl && (
                  <div className="flex items-center">
                    <button type="button" className="ml-2 text-red-600 hover:text-red-800 focus:outline-none flex items-center" onClick={handleRemoveImage}>
                      <FaTimesCircle className="w-8 h-8" />
                      <p className="ml-1 lg:text-md">Cancel</p>
                    </button>
                  </div>
                )}
              </div>
            </div>
            <div className="mb-2 lg:mb-3">
              <label className="block text-sm font-bold mb-1 lg:mb-2 lg:text-xl" htmlFor="ShopName">
                Shop Name
              </label>
              <input
                type="text"
                id="ShopName"
                name="ShopName"
                value={product.ShopName}
                onChange={handleChange}
                className="shadow appearance-none border rounded w-full py-2 px-3 leading-tight focus:outline-none focus:shadow-outline"
                placeholder="Shop Name"
                readOnly
              />
            </div>
            <div className="mb-2 lg:mb-3">
              <label className="block text-sm font-bold mb-1 lg:text-xl lg:mb-2" htmlFor="ShopLocation">
                Shop Location
              </label>
              <input
                type="text"
                id="ShopLocation"
                name="ShopLocation"
                value={product.ShopLocation}
                onChange={handleChange}
                className="shadow appearance-none border rounded w-full py-2 px-3 leading-tight focus:outline-none focus:shadow-outline"
                placeholder="Shop Location"
              />
            </div>
            <div className="mb-2 lg:mb-3">
              <label className="block text-sm font-bold mb-1 lg:text-xl lg:mb-2" htmlFor="ShopDescription">
                Shop Description
              </label>
              <input
                type="text"
                id="ShopDescription"
                name="ShopDescription"
                value={product.ShopDescription}
                onChange={handleChange}
                className="shadow appearance-none border rounded w-full py-2 px-3 leading-tight focus:outline-none focus:shadow-outline"
                placeholder="Shop Description"
              />
            </div>

            <div className="flex items-center justify-between">
              <button type="submit" className="bg-secondary hover:opacity-90 text-white font-bold py-2 px-8 rounded focus:outline-none focus:shadow-outline">
                Save
              </button>
              {profileState.profileLoading && <p>Loading...</p>}
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ShopProfile;
