import React, { useEffect, useState } from 'react'
import img from "../images/cloth.png";
import axios from 'axios';
import { Link } from 'react-router-dom';
import Footer from '../Components/Footer';

const Products = ({ productcard, searchQuery }) => {
  const myStyle = {
    width: "19rem",
  };

  const [selectedCategory, setSelectedCategory] = useState("all");
  const [products, setProducts] = useState([]);
  const [sortOrder, setSortOrder] = useState("");
  const [sortedProducts, setSortedProducts] = useState([]);
  
  useEffect(() => {
    async function fetchData() {
      try {
        const response = await axios.get("https://fakestoreapi.com/products");
        const data = response.data;
        setProducts(data);
      } catch (error) {
        console.error('Error fetching data', error);
      }
    }

    fetchData();
  }, []);

  const filterProducts = productcard.filter((product) => {
    const productTitle = product.title ? product.title.toLowerCase() : "";
    const search = searchQuery ? searchQuery.toLowerCase() : "";

    return (
      (selectedCategory === "all" || product.category === selectedCategory) &&
      productTitle.includes(search)
    );
  });

  useEffect(() => {
    let sorted = [...filterProducts];

    if (sortOrder === "asc") {
      sorted = sorted.sort((a, b) => a.price - b.price);
    } else if (sortOrder === "desc") {
      sorted = sorted.sort((a, b) => b.price - a.price);
    } else if (sortOrder === "true") {
      sorted = sorted.sort((a, b) => a.title.localeCompare(b.title));
    } else if (sortOrder === "false") {
      sorted = sorted.sort((a, b) => b.title.localeCompare(a.title));
    }

    setSortedProducts( [...sorted]);
  }, [sortOrder, filterProducts]);

  const handleSort = (order) => {
    setSortOrder(order);
  };
 




  return (
    <>
     <div className="container">
     <div className="row p-4 p-md-5 mb-5 rounded text-body-emphasis bg-body-secondary rounded-4 mt-5">
        <div className="col-md-8">
          <h1 className="display-4 fst-italic mainheading fw-bold">Our Products</h1>
          <p className="lead my-3">
            Multiple lines of text that form the lede, informing new readers
            quickly and efficiently about what’s most interesting in this post’s
            contents.
          </p>
          <p className="lead mb-0">
            <a href="#" className="text-body-emphasis btn btn-info fw-bold">
              Shop Now
            </a>
          </p>
        </div>
        <div className="col-md-4">
          <div id="carouselExampleAutoplaying" className="carousel slide mx-5" data-bs-ride="carousel">
            <div className="carousel-inner">
              <div className="carousel-item active">
                <img src={img} alt="Product" width="200" height="250" />
              </div>
            </div>
          </div>
        </div>
      </div>
      </div>
      <div className="container-cart  ">
           <h1 class=" featured-title  mainheading  "> Products Collection</h1>
          <div >

          <h5 class="  f-h ">
          🔥 Hurry, Limited Time Offer! Get the Trendy Widget X1 at $19.99 - 50% OFF! 🔥
          </h5>
          </div>

</div>
{/* sorting section and  all products */}

<div class="row  ">
        {/* filter products */}
        <div class="col-md-2 mx-5 mt-5 filter-products  ">
          <h5 class="fw- ">Sort A To Z</h5>
          
          <div class="form-check">
  <input  onClick={() => handleSort("true")} class="form-check-input" type="checkbox" value="" id="flexCheckChecked" />
  <label  class="form-check-label" for="flexCheckChecked">
  A To Z
  </label>
</div>
          <div class="form-check">
  <input onClick={() => handleSort("false")} class="form-check-input" type="checkbox" value="" id="flexCheckChecked" />
  <label  class="form-check-label" for="flexCheckChecked">
     Z To A
  </label>
</div>
<hr />
<h5 class=" ">Rate</h5>
<div class="form-check">
  <input onClick={() => handleSort("asc")}   class="form-check-input" type="checkbox" value="" id="flexCheckChecked" />
  <label  class="form-check-label" for="flexCheckChecked">
   Low To High
  </label>
</div>
<div class="form-check">
  <input onClick={() => handleSort("desc")}  class="form-check-input" type="checkbox" value="" id="flexCheckChecked" />
  <label  class="form-check-label" for="flexCheckChecked">
   High To Low
  </label>
</div>
<hr />
<h5 class="mb-3 ">Category</h5>


<div className="form-check">
    <input
      type="checkbox"
      className="form-check-input"
      id="categoryAll"
      checked={selectedCategory === "all"}
      onChange={() => setSelectedCategory("all")}
     
    />
    <label className="form-check-label" htmlFor="categoryAll">
      All
    </label>
  </div>
  <div className="form-check">
    <input
      type="checkbox"
      className="form-check-input"
      id="categoryMensClothing"
      checked={selectedCategory === "men's clothing"}
      onChange={() => setSelectedCategory("men's clothing")}
    
    />
    <label className="form-check-label" htmlFor="categoryMensClothing">
      Men's Clothing
    </label>
  </div>
  <div className="form-check">
    <input
      type="checkbox"
      className="form-check-input"
      id="categoryWomensClothing"
      checked={selectedCategory === "women's clothing"}
      onChange={() => setSelectedCategory("women's clothing")}
     
    />
    <label className="form-check-label" htmlFor="categoryWomensClothing">
      Women's Clothing
    </label>
  </div>
  <div className="form-check">
    <input
      type="checkbox"
      className="form-check-input"
      id="categoryJewelry"
      checked={selectedCategory === "jewelery"}
      onChange={() => setSelectedCategory("jewelery")}
      
    />
    <label className="form-check-label" htmlFor="categoryJewelry">
      Jewelry
    </label>
  </div>
  <div className="form-check">
    <input
      type="checkbox"
      className="form-check-input"
      id="categoryElectronics"
      checked={selectedCategory === "electronics"}
      onChange={() => setSelectedCategory("electronics")}
     
      
    />
    <label className="form-check-label" htmlFor="categoryElectronics">
      Electronics
    </label>
  </div>

        </div>

          
        <div class="col d-flex flex-row flex-wrap mt-5  ">
       
          {/* map data and show products  */}
      
        
          {sortedProducts.map((product) => (
           <Link to={`/product-details/${product.id}`} style={{ textDecoration: "none" }}> <div
              class="card custom-card mb-4 mx-2   "
              style={myStyle}
              key={product.id}
            >
              <img
                src={product.image}
                class="card-img-top p-2"
                alt={product.title}
              />
              <div class="card-body">
                <h5 class="card-title   ">{product.title.slice(0,15 )}.....</h5>
                <p class="card-text">
                  
                </p>
                <a href="#" class="btn btn-warning  first:">
                  ${product.price}
                </a>
              </div>
            </div>
            </Link>
          ))}
          
        </div>
      </div>
      
       {/* news letter */}
       <div class="container-news-letter  m-5">
        <div class="container-news">
          <h1> Subscribe to Our Newsletter</h1>
          <p>Stay up to date with the latest news and updates.</p>

          <form>
            <div class="form-group col-md-4">
              <label for="email">Email address:</label>
              <input
                type="email"
                class="form-control mt-3"
                id="email"
                placeholder="Enter your email"
              />
            </div>

            <button type="submit" class="btn btn-primary mt-3  ">
              Subscribe
            </button>
          </form>
        </div>
      </div>
      <Footer/>
     
    </>
  )
}

export default Products
