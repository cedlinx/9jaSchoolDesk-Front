import React, {useEffect} from "react";
import {useParams} from "react-router-dom";
import styles from "./ViewLesson.module.scss";
import cx from "classnames";
import {videoLessonsData} from "@/helpers/sampleData";
import VideoCard from "@/components/VideoCard/VideoCard";
import { Icon } from "@iconify/react";



const ViewLesson = () => {
  const {id} = useParams();
  const [product, setProduct] = React.useState(null);

  useEffect(() => {
    console.log(id);
    const result = videoLessonsData.find(item => item.id*1 === id*1);
    console.log(result);
    setProduct(result);
  }, [id]);

  return (
    <div className={cx(styles.viewLessonContainer, "flexCol")}>
      <div className={cx(styles.lessonDetails, "flexRow-space-between")}>
        <p><span className={cx(styles.title)}>{product && product.name}</span><Icon icon="ci:dot-01-xs" color="#828282" width="12" /><small>Subject</small></p>
      </div>
      <div className={cx(styles.container, "row", "g-0")}>
        <div className={cx(styles.mainContent, "col-md-12", "col-lg-9", "flexCol", "g-0")}>
  

          <div className={cx(styles.viewingArea)}>
            <img src={product?.images && product?.images[0]} alt="" />
          </div>
          <div className={cx(styles.transcriptArea)}>
            <h5>Transcript</h5>
            <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Suscipit, ducimus doloremque quidem quae accusamus a sed eius blanditiis hic autem illo delectus id ipsa, commodi fugiat accusantium! Eveniet, quis repudiandae?</p>
          </div>
        </div>
        <div className={cx(styles.aside, "flexCol", "col-lg-3")}>
          <div className={cx(styles.subGroupContainer)}>
            {videoLessonsData && videoLessonsData.map((item, index)=>{
              return(
                <div key={index}>
                  <VideoCard productDetails={item} />
                </div>
              );
            })}
          </div>
        </div>
      </div>
   
    </div>
  );
};

export default ViewLesson;