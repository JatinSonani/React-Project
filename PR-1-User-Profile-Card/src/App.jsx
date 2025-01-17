import React from "react";
import UserProfileCard from "./Components/UserProfileCard";
import "./App.css";

const App = () => {
  return (
    <div className="app-container">
      <div className="card-container">
        <UserProfileCard
          name="John Doe"
          email="johndoe@example.com"
          profilePic="https://assets.entrepreneur.com/content/3x2/2000/20180802150506-GettyImages-647259592-edit.jpeg"
          phone="123-456-7890"
          address="123 Main St, Anytown, USA"
          age="30"
          company="Tech Solutions Inc."
          website="https://example.com"
          bio="A passionate developer who loves to create amazing web experiences."
        />
        <UserProfileCard
          name="Jane Smith"
          email="janesmith@example.com"
          profilePic="https://www.imageconsultinginstitute.com/wp-content/uploads/2021/12/smiling-confident-businesswoman-posing-with-arms-folded.jpg"
          phone="987-654-3210"
          address="456 Oak St, Sometown, USA"
          age="28"
          company="Design Studio"
          website="https://designstudio.com"
          bio="An innovative designer with a knack for creating stunning visuals."
        />
        <UserProfileCard
          name="Michael Brown"
          email="michaelbrown@example.com"
          profilePic="https://png.pngtree.com/background/20230516/original/pngtree-asian-company-businessman-and-woman-posing-on-gray-background-picture-image_2611569.jpg"
          phone="555-987-1234"
          address="789 Pine St, Big City, USA"
          age="35"
          company="Finance Corp."
          website="https://financecorp.com"
          bio="A detail-oriented financial analyst with over 10 years of experience."
        />
        <UserProfileCard
          name="Emily Johnson"
          email="emilyjohnson@example.com"
          profilePic="https://cdn.prod.website-files.com/65393b768d06ee4c16d24a33/66e84607f728987b4943d7f2_65a6b69ebd29b68232682ad4_best-business-to-start-from-home-for-women.jpeg"
          phone="111-222-3333"
          address="321 Elm St, Smalltown, USA"
          age="27"
          company="Marketing Pro"
          website="https://marketingpro.com"
          bio="A creative marketing specialist who thrives on delivering exceptional campaigns."
        />
        <UserProfileCard
          name="Chris Williams"
          email="chriswilliams@example.com"
          profilePic="https://as2.ftcdn.net/jpg/05/46/01/69/1000_F_546016914_qE7KlgNMJCzFSueLhBZ1Qo7NbmIVfu9e.jpg"
          phone="444-555-6666"
          address="567 Birch St, Suburbia, USA"
          age="32"
          company="Green Energy Co."
          website="https://greenenergy.com"
          bio="A passionate environmentalist working towards sustainable solutions."
        />
        <UserProfileCard
          name="Sophia Davis"
          email="sophiadavis@example.com"
          profilePic="https://cdn.pixabay.com/photo/2023/12/19/22/46/business-8458541_1280.jpg"
          phone="777-888-9999"
          address="890 Maple St, New City, USA"
          age="29"
          company="Healthcare Plus"
          website="https://healthcareplus.com"
          bio="A dedicated healthcare professional committed to improving patient outcomes."
        />
      </div>
    </div>
  );
};

export default App;
