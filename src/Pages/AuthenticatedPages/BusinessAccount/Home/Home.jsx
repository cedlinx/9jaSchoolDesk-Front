import React, {useEffect} from "react";
import {useDispatch, useSelector} from "react-redux";
import {Link, useNavigate} from "react-router-dom";
import cx from "classnames";
import styles from "./Home.module.scss";
import {Card, Tabs, Tab} from "react-bootstrap";
import Button from "@/components/Button/Button";
import { allAssetsTypes, chartData } from "@/redux/Assets/assets.action";

import { Line, Doughnut } from "react-chartjs-2";
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend, ArcElement} from "chart.js";
  
ChartJS.register( CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend, ArcElement);

const Home = () => {

	const navigate = useNavigate();
	const dispatch = useDispatch();
	const assetsTypes = useSelector((state)=>state?.assets?.allAssetsTypesData?.data);
	const chartValues = useSelector((state)=>state?.assets?.chartData?.data);

	const isMobile = window.innerWidth < 500;
	const responsiveSizeHack = isMobile ? window.innerWidth + 400 : window.innerWidth;

	useEffect(() => {
		dispatch(allAssetsTypes());
		dispatch(chartData());
	}, [dispatch]);

	let mainLineChartDataArray = [];
	let mainLineChartLabelArray = [];
	assetsTypes && assetsTypes[0].map((asset, index) => {
		mainLineChartLabelArray.push(asset.type);
		chartValues?.asset.map((value, idx) => {
			value.type === asset.type && mainLineChartDataArray.push(value.count);
		}); 
		mainLineChartDataArray.push(0);
	});
	const pieChartData = {
		labels: ["Recovered", "Missing",  "Transferred"],
		datasets: [
		  {
				label: "# of Assets",
				data: [chartValues?.counts?.recovered_assets, chartValues?.counts?.missing_assets, chartValues?.counts?.transferred_assets],
				backgroundColor: [
					"#2C0085",
			  "#FF8001",
			  
			  "#09001B"
				],
				borderWidth: 0,
				hoverOffset: 10,
				hoverBorderWidth: 1,
				spacing: 5
		  }
		]
	  };

	  const pieChartOptions = {
		// responsive: true,
		maintainAspectRatio: false,
		cutout : "80%",
		layout: {
			padding: 16
		},
		plugins: {
		  legend: {
				display: true,
				position: "bottom",	
				labels: {
					usePointStyle: true,
					pointStyle: "circle",
					padding: 10			

				  }

		  },
		  title: {
				display: false
		  },
		  tooltip: {
			  enabled: true
		  }
		},
		animation:{
			animateScale: true
		},
		scales: {
			x: {
				display: false
			},
			y: {
				display: false
			}
		}
	  };

	const mainLineChartData = {
		labels: mainLineChartLabelArray,
		datasets: [
		  {
				data: mainLineChartDataArray,
				fill: false,
				borderColor: "#9580C2",
				borderWidth: 3
		  }
		]
	  };

	const cardLineChartOptions = {
		responsive: true,
		plugins: {
		  legend: {
				display: false
		  },
		  title: {
				display: false
		  },
		  tooltip: {
			  enabled: false
		  }
		},
		animations: {
			radius: {
			  duration: 400,
			  easing: "linear",
			  loop: (context) => context.active
			}
		  },
		  hoverRadius: 4,
		  hoverBackgroundColor: "#2C0085",
		  interaction: {
			mode: "nearest",
			intersect: false,
			axis: "x"
		  },
		elements: {
			point:{
				// radius: 0,
				borderWidth: 0,
				radius: 0,
				backgroundColor: "rgba(0,0,0,0)"
			}
		},
		scales: {
			x: {
				display: false
			},
			y: {
				display: false
			}
		}
	  };

	  const mainLineChartOptions = {
		responsive: true,
		maintainAspectRatio: false,
		layout: {
			padding: 20
		},
		plugins: {
		  legend: {
				display: false
		  },
		  title: {
				display: false
		  },
		  tooltip: {
			  enabled: true
		  }
		},
		animations: {
			radius: {
			  duration: 400,
			  easing: "linear",
			  loop: (context) => context.active
			}
		  },
		  hoverRadius: 4,
		  hoverBackgroundColor: "#2C0085",
		  interaction: {
			mode: "nearest",
			intersect: false,
			axis: "x"
		  },
		elements: {
			point:{
				// radius: 0,
				borderWidth: 0,
				radius: 2,
				backgroundColor: "rgba(0,0,0,0)"
			}
		},
		scales: {
			x: {
				display: true,
				grid: {
					display: false
				  }
			},
			y: {
				display: true,
				beginAtZero: true,
				grid: {
					borderDash: [5, 5],
					drawBorder: false

				},
				ticks: {
					// forces step size to be 50 units
					// stepSize: 10
				  }
				
			}
		}
	  };
	  
	  const labels = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
	  
	   const recoveredData = {
		labels,
		datasets: [
		  {
				label: "Dataset 1",
				data: [10,12,30,400,50,666, 22, 14, 44, 234, 77],
				borderColor: "#9580C2",
				borderWidth: 3
		  }
		]
	  };

	  const missingData = {
		labels,
		datasets: [
		  {
				label: "Dataset 1",
				data: [11,20,13,40,15,6, 22, 14, 44, 234, 77],
				borderColor: "#9580C2",
				borderWidth: 3

		  }
		]
	  };

	  const transferredData = {
		labels,
		datasets: [
		  {
				label: "Dataset 1",
				data: [100,29,300,412,566,66, 22, 14, 44, 234, 77],
				borderColor: "#9580C2",
				borderWidth: 3

		  }
		]
	  };

	  const stolenData = {
		labels,
		datasets: [
		  {
				label: "Dataset 1",
				data: [11,42,83,34,25,6, 22, 14, 44, 234, 77],
				borderColor: "#9580C2",
				borderWidth: 3

		  }
		]
	  };

	  const cardArray = [
		{
			heading: "Recovered",
			value: chartValues?.counts?.recovered_assets,
			data: recoveredData
		},
		{
			heading: "Transferred",
			value: chartValues?.counts?.transferred_assets,
			data: transferredData
		},
		{
			heading: "Missing",
			value: chartValues?.counts?.missing_assets,
			data: missingData
		}
		// {
		// 	heading: "Stolen",
		// 	value: chartValues?.counts?.stolen_assets,
		// 	data: stolenData
		// }
	];

	return (
		<div className={cx(styles.container)}>

			<div className={cx(styles.headerWrapper, "flexRow")}>
				<h2>Overview</h2>
				<p><Link to={"add-new-asset"}>+Add New</Link></p>
			</div>

			<div className={cx(styles.cardWrapper, "flexRow")}>
					
				{cardArray.length && cardArray.map((element, index)=>{
					return(
						<Card key={index} className={cx(styles.cardItem)}>
							<Card.Header className={cx(styles.cardHeader)}>
								<h3>{element.value}</h3>
								<p>{element.heading}</p>
							</Card.Header>
							<Card.Body className={cx(styles.cardBody)}>
								<Line options={cardLineChartOptions} data={element.data} />
							</Card.Body>
						</Card>
					);
				})}
			</div>

			<div className={cx(styles.chartsWrapper, "row")} >
				<div className={cx(styles.leftChart, "col-md-12", "col-lg-6")}>
					<h4>Analytics 2022</h4>

					<Tabs defaultActiveKey="first" style={{justifyContent: "flex-end"}}>
						<Tab style={{height:"25rem",width:"100%"}} eventKey="first" title="Monthly">
							<Line options={mainLineChartOptions} data={mainLineChartData} />
						</Tab>
						<Tab style={{height:"25rem",width:"100%"}} eventKey="second" title="Weekly">
							<Line options={mainLineChartOptions} data={mainLineChartData} />
						</Tab>
						<Tab style={{height:"25rem",width:"100%"}} eventKey="third" title="Daily">
							<Line options={mainLineChartOptions} data={mainLineChartData} />
						</Tab>
					</Tabs>
					
				</div>
				<div className={cx(styles.rightChart, "col-md-12", "col-lg-6")}>
					<Doughnut options={pieChartOptions} data={pieChartData} 
						width={300}
						height={300}
					/>
				</div>
			</div>

			<Button onClick={()=> navigate("")} title="View Ownership History"  textColor="#fff" bordercolor="2C0085" borderRadiusType="lowRounded" bgColor="#2C0085" />
            
		</div>
	);
};

Home.propTypes = {
    
};

export default Home;