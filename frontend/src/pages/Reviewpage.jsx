import React, { useState, useEffect } from "react";
import {
  MDBContainer,
  MDBRow,
  MDBCol,
  MDBCard,
  MDBCardBody,
  MDBTypography,
  MDBIcon,
  MDBInput,
} from "mdb-react-ui-kit";
import "../CSS/ReviewPage.css";
import Footer from "../components/Footer";
import useAPI from "../hooks/useAPI";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Box } from "@mui/system";

export default function ReviewPage() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [comment, setComment] = useState("");
  const [reviews, setReviews] = useState([]);
  const [review, setReview] = useState({
    name: "",
    email: "",
    comment: "",
    rating: 0,
  });
  const { GET, POST } = useAPI();

  const submitReview = async (e) => {
    e.preventDefault(); // Prevent form default submission behavior
    try {
      const reviewData = {
        name: review.name,
        email: review.email,
        comment: review.comment,
        rating: review.rating,
      };
      // console.log("Review data:", reviewData);

      const response = await POST("/api/review", reviewData);
      toast.success("Review submitted successfully!");
      // Clear the form
      setReview({
        name: "",
        email: "",
        comment: "",
        rating: 0,
      });
    } catch (error) {
      console.error("Error submitting review:", error);
      toast.error("Failed to submit review. Please try again.");
    }
  };

  useEffect(() => {
    const fetchReviews = async () => {
      try {
        const response = await GET("/api/review");
        setReviews(response.data);
      } catch (error) {
        console.error("Error fetching reviews:", error);
        toast.error("Failed to fetch reviews. Please try again.");
      }
    };

    fetchReviews();
  }, [submitReview]);

  const handleReviewChange = (e) => {
    const { name, value } = e.target;
    setReview((prevReview) => ({ ...prevReview, [name]: value }));
  };

  const setRating = (rating) => {
    setReview((prevReview) => ({ ...prevReview, rating }));
  };

  const deleteReview = async (indexToDelete) => {
    const reviewId = reviews[indexToDelete]?._id;
    const response = await POST(`/api/review/delete/${reviewId}`)
      .then((response) => {
        if (response.status === 403) {
          toast.error("You are not authorized to delete this review.");
          return;
        }
        // console.log("Review deleted:", response);
        toast.success("Review deleted successfully!");
      })
      .catch((error) => {
        toast.error("Failed to delete review. Please try again.");
      });
    setReviews((prevReviews) =>
      prevReviews.filter((_, index) => index !== indexToDelete)
    );
  };

  return (
    <>
      <ToastContainer /> {/* Ensure this line is included */}
      <MDBContainer className="py-5" style={{ backgroundColor: "#ffffff" }}>
        <MDBRow className="justify-content-center my-5">
          <MDBCol md="6">
            <MDBCard
              style={{
                backgroundColor: "#f0f8ff",
                boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
              }}
            >
              <MDBCardBody>
                <h4 className="text-center mb-4" style={{ color: "#0275d8" }}>
                  Add Your Review
                </h4>
                <form onSubmit={submitReview}>
                  <h6>Your Name</h6>
                  <MDBInput
                    name="name"
                    value={review.name}
                    onChange={handleReviewChange}
                    className="mb-3"
                    required
                    style={{
                      backgroundColor: "#ffffff",
                      border: "2px solid #0275d8",
                      borderRadius: "5px",
                      padding: "5px",
                    }}
                  />

                  <h6>Your Email</h6>
                  <MDBInput
                    name="email"
                    type="email"
                    value={review.email}
                    onChange={handleReviewChange}
                    className="mb-3"
                    required
                    style={{
                      backgroundColor: "#ffffff",
                      border: "2px solid #0275d8",
                      borderRadius: "5px",
                      padding: "5px",
                    }}
                  />

                  <h6>Your Comment</h6>
                  <MDBInput
                    name="comment"
                    value={review.comment}
                    onChange={handleReviewChange}
                    className="mb-3"
                    textarea="true"
                    rows={3}
                    required
                    style={{
                      backgroundColor: "#ffffff",
                      border: "2px solid #0275d8",
                      borderRadius: "5px",
                      padding: "5px",
                    }}
                  />

                  <div className="star-rating mb-3 text-center">
                    <span>Rating:</span>
                    {[...Array(5)]?.map((_, i) => (
                      <MDBIcon
                        key={i}
                        fas
                        icon="star"
                        onClick={() => setRating(i + 1)}
                        className={`star ${
                          i < review.rating ? "text-warning" : "text-muted"
                        }`}
                        style={{
                          cursor: "pointer",
                          marginLeft: "8px",
                          fontSize: "20px",
                        }}
                      />
                    ))}
                  </div>
                  <Box
                    sx={{
                      display: "flex",
                      justifyContent: "center",
                      marginTop: "20px",
                    }}
                  >
                    <button className="Button_submit" type="submit">
                      Submit Review
                    </button>
                  </Box>
                </form>
              </MDBCardBody>
            </MDBCard>
          </MDBCol>
        </MDBRow>


    <h3 className="text-center fw-bold mb-4" style={{ color: "#0275d8" }}>
          Customer Reviews
        </h3>

        <MDBRow className="text-center">
          {reviews?.length === 0 ? (
            <p className="text-center">No reviews yet</p>
            ) : (
          
            reviews?.map((rev, index) => (
              <MDBCol md="4" className="mb-4" key={index}>

                <MDBCard
                  style={{ backgroundColor: "#f0f8ff", position: "relative" , height: "100%" }}
                >
                  <MDBIcon
                    fas
                    icon="trash-alt"
                    onClick={() => deleteReview(index)}
                    className="delete-icon"
                    style={{
                      position: "absolute",
                      top: "10px",
                      right: "10px",
                      cursor: "pointer",
                      fontSize: "20px",
                      color: "#ff4d4d",
                    }}
                  />

                  <MDBCardBody className="py-4">
                    <h5 className="font-weight-bold">
                      {rev.user?.fullName || "Anonymous"}
                    </h5>

                    <MDBTypography
                      listUnStyled
                      className="d-flex justify-content-center"
                    >
                  
                      {[...Array(rev.rating)]?.map((_, i) => (
                        <MDBIcon
                          key={i}
                          fas
                          icon="star"
                          className={`text-warning ${
                            i < rev.rating ? "" : "far"
                          }`}
                        />
                      ))}
                      
                    </MDBTypography>

                    <p className="mt-2">{rev.comment}</p>
                  </MDBCardBody>
                </MDBCard>
              </MDBCol>
            )))}
        </MDBRow>
      </MDBContainer>
      <Footer />
    </>
  ); 
} 
