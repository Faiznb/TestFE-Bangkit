import Carousel from "../../components/Carousel";
import Footer from "../../components/Footer";
import ProductList from "../../components/ProductList";
import SearchBar from "../../components/SearchBar";
import hetset from "../../assets/hetset.jpg";
import kacamatahitam from "../../assets/kacamatahitam.jpg";
import sepatu from "../../assets/sepatu.jpg";
const Home = () => {
  let slides = [{ url: hetset }, { url: kacamatahitam }, { url: sepatu }];
  return (
    <div className="min-h-screen flex flex-col">
      <SearchBar />
      <main className="pt-3 pb-14 lg:pb-0">
        <Carousel slides={slides} />
        <ProductList />
      </main>
      <Footer />
    </div>
  );
};

export default Home;
