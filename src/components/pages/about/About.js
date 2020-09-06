import React, { Component } from "react";
import MainSection from "./MainSection"
import { Parallax } from "react-parallax"
import Img1 from "../../../img/img_5.JPG"
import Img2 from "../../../img/img_8.JPG"




class About extends Component {

    render() {
        return (
            <div className="">
                <Parallax bgImage={Img1} strength={600}>
                    <div style={{ height: 400, }}>
                    </div>
                </Parallax>

                <MainSection />

                <Parallax bgImage={Img2} strength={700}>
                    <div style={{ height: 500, }}>
                    </div>
                </Parallax>
            </div>
        );
    }

}

export default About;