import BoxProduct from "../../components/BoxProduct";
import Header from "../../components/Header";
import Nav from "../../components/Nav";
import { useDispatch, useSelector } from "react-redux";
import { useState, useEffect } from "react";
import { fetchSellerProduct } from "../../redux/features/seller/product/productThunks";
import { fetchUserProfile } from "../../redux/features/profile/profileThunks";

const Product = () => {
  const dispatch = useDispatch();
  const sellerProductState = useSelector((state) => state.sellerProduct);
  const profileState = useSelector((state) => state.profile);
  const [productData, setProductData] = useState({ products: [] });
  const [profileData, setProfileData] = useState({});

  useEffect(() => {
    dispatch(fetchSellerProduct());
    dispatch(fetchUserProfile("seller"));
  }, [dispatch]);

  useEffect(() => {
    if (sellerProductState.data) {
      setProductData(sellerProductState.data);
    }
  }, [sellerProductState.data]);

  useEffect(() => {
    if (profileState.data) {
      setProfileData(profileState.data);
    }
  }, [profileState.data]);

  return (
    <>
      <Header role="seller" profileData={profileData} loading={profileState.loading} error={profileState.error} />
      <div className="flex">
        <Nav />
        <div className="font-roboto ml-4 lg:ml-72 mt-5 flex gap-9 w-full flex-wrap">
          {sellerProductState.loading ? (
            <p>Loading...</p>
          ) : sellerProductState.error ? (
            <p>Error: {sellerProductState.error.message}</p>
          ) : productData.products && productData.products.length > 0 ? (
            productData.products.map((product) => <BoxProduct key={product.product_id} product={product} />)
          ) : (
            <p>No products available.</p>
          )}
        </div>
      </div>
    </>
  );
};

export default Product;
