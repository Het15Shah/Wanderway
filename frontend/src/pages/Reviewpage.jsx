import React, { useState } from "react";
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
import { useEffect } from "react";
import useAPI from "../hooks/useAPI";
import axios from "axios";
import { toast } from "react-toastify";
import { Box } from "@mui/system";

export default function ReviewPage() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [comment, setComment] = useState("");
  // const [rating, setRating] = useState(0);

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
      console.log("Review data:", reviewData);
      const response = await POST("/api/review", reviewData);
      // console.log("Review submitted:", response);
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
        // console.log("Reviews:", response);
        setReviews(response.data);
      } catch (error) {
        console.error("Error fetching reviews:", error);
        toast.error("Failed to fetch reviews. Please try again.");
      }
    };

    fetchReviews();
  }, [submitReview]);
  // Handle form input changes
  const handleReviewChange = (e) => {
    const { name, value } = e.target;
    setReview((prevReview) => ({ ...prevReview, [name]: value }));
  };

  // Handle star rating
  const setRating = (rating) => {
    setReview((prevReview) => ({ ...prevReview, rating }));
  };

  // Submit review and clear form

  // const fetchReviews = async () => {
  //   try {
  //     const response = await GET("/api/review");
  //     console.log("Reviews:", response);
  //     setReviews(response);
  //   } catch (error) {
  //     console.error("Error fetching reviews:", error);
  //   }
  // };

  // Delete review by index
  const deleteReview = (indexToDelete) => {
    setReviews((prevReviews) =>
      prevReviews.filter((_, index) => index !== indexToDelete)
    );
  };

  return (
    <>
      <MDBContainer className="py-5" style={{ backgroundColor: "#ffffff" }}>
        {/* Back to Home Button */}

        {/* Add Review Form in a Card */}
        <MDBRow className="justify-content-center my-5">
          <MDBCol md="6">
            <MDBCard style={{ backgroundColor: "#fff5e6" }}>
              <MDBCardBody>
                <h4 className="text-center mb-4" style={{ color: "#ffcc00" }}>
                  Add Your Review
                </h4>
                <form onSubmit={submitReview}>
                  {/* Name Field */}
                  <h6>Your Name</h6>
                  <MDBInput
                    name="name"
                    value={review.name}
                    onChange={handleReviewChange}
                    className="mb-3"
                    required
                    style={{
                      backgroundColor: "#ffffff",
                      border: "2px solid #ffcc00",
                      borderRadius: "5px",
                      padding: "5px",
                    }}
                  />

                  {/* Email Field */}
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
                      border: "2px solid #ffcc00",
                      borderRadius: "5px",
                      padding: "5px",
                    }}
                  />

                  {/* Comment Field */}
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
                      border: "2px solid #ffcc00",
                      borderRadius: "5px",
                      padding: "5px",
                    }}
                  />

                  {/* Star Rating Selection */}
                  <div className="star-rating mb-3 text-center">
                    <span>Rating:</span>
                    {[...Array(5)].map((_, i) => (
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

        {/* Review Section */}
        <h3 className="text-center fw-bold mb-4" style={{ color: "#ffcc00" }}>
          Customer Reviews
        </h3>

        {/* Display Existing Reviews */}
        <MDBRow className="text-center">
          {reviews.length === 0 ? (
            <p className="text-center">No reviews yet</p>
          ) : (
            reviews.map((rev, index) => (
              <MDBCol md="4" className="mb-4" key={index}>
                <MDBCard
                  style={{ backgroundColor: "#fff9e6", position: "relative" }}
                >
                  {/* Delete Review Button */}
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
                    {/* Display User's Name */}
                    <h5 className="font-weight-bold">
                      {rev.user?.fullName || "Anonymous"}
                    </h5>
                    {/* Fallback to "Anonymous" if name is not available */}

                    {/* Display Star Rating */}
                    <MDBTypography
                      listUnStyled
                      className="d-flex justify-content-center"
                    >
                      {[...Array(rev.rating)].map((_, i) => (
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

                    {/* Display Review Comment */}
                    <p className="mt-2">{rev.comment}</p>
                  </MDBCardBody>
                </MDBCard>
              </MDBCol>
            ))
          )}
        </MDBRow>

        {/* Add Review Form in a Card */}
      </MDBContainer>
      <Footer />
    </>
  );
}
