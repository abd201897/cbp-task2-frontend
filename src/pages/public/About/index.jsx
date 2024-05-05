import {
  Button,
  Card,
  Col,
  Collapse,
  Divider,
  Flex,
  Image,
  Row,
  Tabs,
  Typography,
} from "antd";
import "./about.scss";
import { getNews } from "../../../core/apis";
import { useEffect, useState } from "react";
import NEWS1 from "../../../assets/images/news1.webp";
import dayjs from "dayjs";

const { Title, Text } = Typography;

const text = `
  A dog is a type of domesticated animal.
  Known for its loyalty and faithfulness,
  it can be found as a welcome guest in many households across the world.
`;
const items = [
  {
    key: "1",
    label: (
      <Title level={5}>
        The unprecedented rise of UK's prospect over US as the top study abroad
        destination The unprecedented rise of UK's prospect over US as the top
        study abroad destination{dayjs().format("DD-MM-YYYY")} <br />
      </Title>
    ),
    children: (
      <div>
        <Title level={5}>
          The unprecedented rise of UK's prospect over US as the top study
          abroad destination The unprecedented rise of UK's prospect over US as
          the top study abroad destination
        </Title>
        <div>
          <Image src={NEWS1} style={{ width: "100%" }} width="100%" />
        </div>
        <a
          href="https://economictimes.indiatimes.com/nri/migrate/study-work-or-be-with-family-how-much-will-moving-to-the-uk-cost-you/slideshow/109246802.cms"
          target="_blank"
          rel="noopener noreferrer"
        >
          The unprecedented rise of UK's prospect over US as the top study
          abroad destination The unprecedented rise of UK's prospect over US as
          the top study abroad destination
        </a>
      </div>
    ),
  },
  {
    key: "2",
    label: (
      <Title level={5}>
        Study, work, or be with family: How much will moving to the UK cost you?{" "}
        {dayjs().format("DD-MM-YYYY")} <br />
      </Title>
    ),
    children: (
      <div>
        <Title level={5}>
          {" "}
          Study, work, or be with family: How much will moving to the UK cost
          you?{" "}
        </Title>
        <div>
          <Image
          width="100%"
            src="https://img.etimg.com/thumb/msid-109246767,width-100,height-75,resizemode-4/nri/migrate/study-work-or-be-with-family-how-much-will-moving-to-the-uk-cost-you.jpg"
            style={{ width: "100%" }}
          />
        </div>
        <a
          href="https://economictimes.indiatimes.com/nri/migrate/study-work-or-be-with-family-how-much-will-moving-to-the-uk-cost-you/slideshow/109246802.cms"
          target="_blank"
          rel="noopener noreferrer"
        >
          Study, work, or be with family: How much will moving to the UK cost
          you?{" "}
        </a>
      </div>
    ),
  },
  {
    key: "3",
    label: "This is panel header 3",
    children: <p>{text}</p>,
  },
  {
    key: "4",
    label: "This is panel header 4",
    children: <p>{text}</p>,
  },
];
const About = () => {
  const [news, setNews] = useState([]);

  const GetNEWSFUN = async () => {
    try {
      const res = await getNews();
      setNews(res?.data?.data);
    } catch (error) {
      console.log(error);
    }
  };
  // useEffect(() => {
  //   GetNEWSFUN();
  // }, []);

  // const items = [];
  // const arrayOfKeys = news?.map((panel, index) => panel?.uuid);
  // news?.map((n, i) =>
  //   items.push({
  //     key: i+1,
  //     label: (
  //       <Title level={5}>
  //         {n?.title} {n?.published_at} <br />({n?.source})
  //       </Title>
  //     ),
  //     children: (
  //       <div>
  //         <Title level={5}>{n?.title}</Title>
  //         <Image src={n?.image_url} style={{ width: "100%" }} />
  //         <a href={n?.url} target="_blank" rel="noopener noreferrer">
  //           {n?.snippet}
  //         </a>
  //       </div>
  //     ),
  //   })
  // );
  return (
    <div
      className="ContentSection"
      style={{ height: "92vh", overflow: "auto", padding: "10px 20px" }}
    >
      <Row gutter={[12, 24]} align="top" justify="space-around">
        <Col xs={24} sm={24} md={16} lg={16}>
          <h1 className="heading">About us</h1>
          <p className="details">
            <span className="uniname">Sheffield Hallam University</span> is one
            of the UK’s largest and most diverse universities: a community of
            around 32,000 students, 4,500 staff and 295,000 alumni around the
            globe. Our mission is simple: we transform lives. We are an
            award-winning university, recently receiving Gold in the Teaching
            Excellence Framework for outstanding support for student success and
            progression. We provide people from all backgrounds with the
            opportunity to acquire the skills, knowledge and experience to
            succeed at whatever they choose to do. As one of the UK’s largest
            and most progressive universities, our teaching, research and
            partnerships are characterised by a focus on real world impact -
            addressing the health, economic and social challenges facing society
            today. We are ambitious for our university, our students, our
            colleagues, our partners, our city and our region. Our vision is to
            be the world's leading applied university; showing what a university
            genuinely focused on transforming lives can achieve.
          </p>

          <Divider>
            <Button className="discover">Discover More</Button>
          </Divider>
          <h1 className="heading">Our Story</h1>
          <p className="details">
            <span className="uniname">Sheffield Hallam University</span> is one
            of the UK’s largest and most diverse universities: a community of
            around 32,000 students, 4,500 staff and 295,000 alumni around the
            globe. Our mission is simple: we transform lives. We are an
            award-winning university, recently receiving Gold in the Teaching
            Excellence Framework for outstanding support for student success and
            progression. We provide people from all backgrounds with the
            opportunity to acquire the skills, knowledge and experience to
            succeed at whatever they choose to do. As one of the UK’s largest
            and most progressive universities, our teaching, research and
            partnerships are characterised by a focus on real world impact -
            addressing the health, economic and social challenges facing society
            today. We are ambitious for our university, our students, our
            colleagues, our partners, our city and our region. Our vision is to
            be the world's leading applied university; showing what a university
            genuinely focused on transforming lives can achieve.
          </p>
        </Col>

        <Col xs={24} sm={24} md={6} lg={6}>
          <h1 className="usefulLinks">Latest News</h1>
          <Collapse items={items} defaultActiveKey={["1", "2"]} />

          <Divider />
          <Card title="Research" className="cardResearch"></Card>
        </Col>
      </Row>
    </div>
  );
};

export default About;
