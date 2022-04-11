import React, {useEffect} from "react";
import {useDispatch, useSelector} from "react-redux";
import {Link} from "react-router-dom";
import cx from "classnames";
import styles from "./Analysis.module.scss";
import {Card, Tabs, Tab} from "react-bootstrap";

import { allAssetsTypes, chartData } from "@/redux/Assets/assets.action";

import { Line, Doughnut, Chart } from "react-chartjs-2";
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend, ArcElement} from "chart.js";
  
ChartJS.register( CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend, ArcElement);

import Button from "@/components/Button/Button";
import {useNavigate} from "react-router-dom";
import { Icon } from "@iconify/react";

const Analysis = () => {

	const dispatch = useDispatch();
	const navigate = useNavigate();
	const assetsTypes = useSelector((state)=>state?.assets?.allAssetsTypesData?.data);
	const chartValues = useSelector((state)=>state?.assets?.chartData?.data);

	useEffect(() => {
		dispatch(allAssetsTypes());
		dispatch(chartData());
	}, [dispatch]);

	const plugins = [{
		beforeDraw: function(chart) {
		 var width = chart.width,
			 height = chart.height,
			 ctx = chart.ctx;
			 ctx.restore();
			 var fontSize = (height / 160).toFixed(2);
			 ctx.font = fontSize + "em sans-serif";
			 ctx.textBaseline = "top";
			 var text = "Foo-bar",
			 textX = Math.round((width - ctx.measureText(text).width) / 2),
			 textY = height / 2;
			 ctx.fillText(text, textX, textY);
			 ctx.save();
		} 
	  }];

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

	  const cardPieChartOptions = {
		responsive: true,
		maintainAspectRatio: false,
		radius: "100%",
		cutout : "80%",
		layout: {
			padding: 15
		},
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
		labels: ["Recovered"],
		datasets: [
		  {
				label: "# of Assets",
				data: [chartValues?.counts?.recovered_assets],
				backgroundColor: ["#2C0085"],
				borderWidth: 0,
				hoverOffset: 10,
				hoverBorderWidth: 1,
				spacing: 5
		  }
		]
	  };

	  const missingData = {
		labels: ["Missing"],
		datasets: [
		  {
				label: "# of Assets",
				data: [chartValues?.counts?.missing_assets],
				backgroundColor: ["#2C0085"],
				borderWidth: 0,
				hoverOffset: 10,
				hoverBorderWidth: 1,
				spacing: 5
		  }
		]
	  };

	  const transferredData = {
		labels: ["Transferred"],
		datasets: [
		  {
				label: "# of Assets",
				data: [Number(chartValues?.counts?.transferred_assets)],
				backgroundColor: ["#2C0085"],
				borderWidth: 0,
				hoverOffset: 10,
				hoverBorderWidth: 1,
				spacing: 0
		  }
		],
		text: 50
	  };

	  const stolenData = {
		labels: ["Stolen"],
		datasets: [
		  {
				label: "# of Assets",
				data: [chartValues?.counts?.missing_assets],
				backgroundColor: ["#2C0085"],
				borderWidth: 0,
				hoverOffset: 10,
				hoverBorderWidth: 1,
				spacing: 5
		  }
		]
	  };


	const cardArray = [
		{
			heading: "All Assets",
			value: "555"
		},
		{
			heading: "All Transferred Assets",
			value: "555k"
		},
		{
			heading: "All Recovered Assets",
			value: "555k"
		},
		{
			heading: "All Stolen & Missing Assets",
			value: "555k"
		}
	];

	const cardArray2 = [
		{
			heading: "Transferred Assets",
			value: "555",
			data: transferredData,
			plugin: [...plugins][0]
		},
		{
			heading: "Missing Assets",
			value: "555k",
			data: missingData,
			plugin: plugins

		},
		{
			heading: "Recovered Assets",
			value: "555",
			data: recoveredData,
			plugin: plugins
		},
		{
			heading: "Stolen Assets",
			value: "555k",
			data: stolenData,
			plugin: plugins
		}
	];

	return (
		<div className={cx(styles.container)}>

			<div className={cx(styles.headerWrapper, "flexRow")}>
				<h2>Analysis</h2>
				<div>
					
					<Button title="Download Report"  textColor="#fff" bordercolor="2C0085" borderRadiusType="lowRounded" bgColor="#2C0085" icon={<Icon icon="ant-design:file-text-filled" color="white" />} /></div>
			</div>

			<div className={cx(styles.cardWrapper, "flexRow")}>
					
				{cardArray.length && cardArray.map((element, index)=>{
					return(
						<Card key={index} className={cx(styles.cardItem)}>
							<Card.Header className={cx(styles.cardHeader)}>
								<p>{element.heading}</p>
								<h3>{element.value}</h3>
							</Card.Header>
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
					<Doughnut options={pieChartOptions} data={pieChartData} 				width={300}
						height={300}
					/>
				</div>
			</div>  

			<h4 style={{marginBottom: "1rem"}} >Asset Tracking</h4>
			<div className={cx(styles.cardWrapper, "flexRow")}>
					
				{cardArray2.length && cardArray2.map((element, index)=>{
					return(
						<Card key={index} className={cx(styles.cardItem)}>
							<Card.Header className={cx(styles.cardHeader)}>
								<p>{element.heading}</p>
							</Card.Header>
							<Card.Body className={cx(styles.cardBody)}>
								<Doughnut options={cardPieChartOptions} data={element.data}  plugins={element.plugin}  />
							</Card.Body>
						</Card>
					);
				})}
			</div>
                     
		</div>
	);
};

Analysis.propTypes = {
    
};

export default Analysis;