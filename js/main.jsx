//main .jsx file


var { Router, Route, IndexRoute, Link, browserHistory } = ReactRouter
var browserHistory = ReactRouter.browserHistory;

var PortfolioHome = React.createClass({

	render:function() {

		return(
			<div className="home-page">
				<h1>Welcome</h1>
				<p>I am a 4th year student at the University of Washington and a first year student in the iSchool pursuing a BS in Informatics with a Custom Track degree option. I have a strong background in both Android and Web application development, but my main interests center around Information Security and Data Science. I am passionate about utilizing the power of data to address to numerous environmental issues our world currently faces. Please take a moment to review some of my projects and e-mail me with any inqueries.</p>
			</div>
		);
	}
});

var PortfolioContact = React.createClass({

	render:function() {

		return(
			<div className="home-page">
				<h1>Contact</h1>
				<h4>Connect with Patrick</h4>
				<ul>
					<li><a href="https://www.linkedin.com/in/patrick-smith-29a800b7">LinkedIn</a></li>
					<li><a href="https://github.com/psmith94">GitHub</a></li>
					<li>E-mail: psmith94@uw.edu</li>
				</ul>
			</div>
		);
	}
});

var ProjectItem = React.createClass({

	render:function() {

		return(
			<div className="item-div">
				<img className="project-icon" src={this.props.data.icon}></img>
				<h4 className="project-title">{this.props.data.title}</h4>
				<p className="project-desc">{this.props.data.desc}</p>
				<a className="project-sg-links" href={this.props.data.screengrab}>Download a screenshot</a>
				<a className="project-links" href={this.props.data.link}>Link to project</a>
			</div>
		);
	}
});

var PortfolioProjects = React.createClass({

	getInitialState:function() {
		return {projectData: []}
	},

	componentDidMount:function() {
		$.get('../data/data.json').then(function(data) {
			this.setState({projectData: data})
		}.bind(this));
		console.log(this);
	},

	render:function() {
		console.log(this.state.projectData);
		let projects = this.state.projectData;
		return(
			<div className="home-page">
				<h1>Projects</h1>
				<div className="home-page">	
					{$.map(projects, function(item, index){
						return <ProjectItem data={item} key={index}/>
					})}
				</div>
			</div>
		);
	}
});

var PortfolioMain = React.createClass({

	componentWillMount:function() {

	},

	componentDidMount:function() {
		$(".button-collapse").sideNav();
	},

	render:function(){
		
		return(
			<div>
				<nav>
				

					<div className="indigo darken-4 nav-wrapper">
				    	<a className="brand-logo">Patrick Smith</a>
				    	<a data-activates="dropdown2" className="button-collapse"><i className="material-icons">menu</i></a>
				    	<ul className="right hide-on-med-and-down">
				      		<li><a className="dropdown-button" data-activates="dropdown1">Navigate<i className="material-icons right">arrow_drop_down</i></a></li>
				    	</ul>
					    <ul id="dropdown1" className="dropdown-content">
			  				<li><Link to="/">Home</Link></li>
			  				<li className="divider"></li>
			  				<li><Link to="projects">Projects</Link></li>
			  				<li className="divider"></li>
			  				<li><Link to="contact">Contact Me</Link></li>
						</ul>
					
						<ul id="dropdown2" className="side-nav">
			  				<li><Link to="/">Home</Link></li>
			  				<li className="divider"></li>
			  				<li><Link to="projects">Projects</Link></li>
			  				<li className="divider"></li>
			  				<li><Link to="contact">Contact Me</Link></li>
						</ul>
						
				    </div>
				</nav>
			
				<div className="fixed-action-btn">
	    			<a href="mailto:psmith94@uw.edu" className="btn-floating btn-large indigo darken-4">
	      				<i className="large material-icons">email</i>
	    			</a>
	  			</div>	
			
	  			{this.props.children}
			    
			</div>
		);
	}
});

ReactDOM.render((
	<Router history={browserHistory}>
		<Route path="/" component={PortfolioMain}>
			<IndexRoute component={PortfolioHome}/>
			<Route path="/projects" component={PortfolioProjects}/>
			<Route path="/contact" component={PortfolioContact}/>
		</Route>
	</Router>
), document.querySelector('main'));