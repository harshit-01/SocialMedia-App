import React from 'react';
import {CardGroup,Card,Container,Button} from "react-bootstrap";
import {Link} from "react-router-dom"

export default function Courses(){
    return(
        <Container className="mt-3">
            <Button  variant="link" size="sm" style={{
                color:"white",textDecoration:"none"
            }}>
            <Link to="/" style={{
                color:"blue",textDecoration:"none"
            }}>Move Back to Home Page </Link></Button>
            <h4 className="fw-bolder">Offline Courses offered by Solutionists</h4>
            <CardGroup className="gap-3">
                <Card role="button" onClick={()=>{
                     alert("Please dial 9999992222 if you want to apply for any course")
                }}>
                    <Card.Img variant="top" src="https://res.cloudinary.com/practicaldev/image/fetch/s--Tu2z9cvG--/c_limit%2Cf_auto%2Cfl_progressive%2Cq_auto%2Cw_880/https://miro.medium.com/max/696/1%2A6UpwEDOw04H5fKyaMGXpSw.png" />
                    <Card.Body>
                    <Card.Title>C++ Beginner Course</Card.Title>
                    <Card.Text>
                        <p>
                        Fee: 10k/monthly<br />
                        Duration: 2 months<br />
                        Company : <strong>Solutionists</strong><br />
                        <i>Certificate and goodies on successful completion of  the course</i>
                        </p>
                    </Card.Text>
                    </Card.Body>
                    <Card.Footer>
                    <small className="text-muted">Last updated 1 hr ago</small>
                    </Card.Footer>
                </Card>
                <Card role="button" onClick={()=>{
                     alert("Please dial 9999992222 if you want to apply for any course")
                }}>
                    <Card.Img variant="top" src="https://www.fossmint.com/wp-content/uploads/2020/03/Udemy-Advance-Python-Learning-Courses.png" />
                    <Card.Body>
                    <Card.Title>Python Beginner</Card.Title>
                    <Card.Text>
                        <p>
                        Fee: 12k/monthly<br />
                        Duration: 2 months<br />
                        Company : <strong>Solutionists</strong><br />
                        <i>Certificate and goodies on successful completion of  the course</i>
                        </p>
                    </Card.Text>
                    </Card.Body>
                    <Card.Footer>
                    <small className="text-muted">Last updated 25 mins ago</small>
                    </Card.Footer>
                </Card>
                <Card role="button" onClick={()=>{
                     alert("Please dial 9999992222 if you want to apply for any course")
                }}>
                    <Card.Img variant="top" src="https://www.cbitss.in/wp-content/uploads/2018/12/java-training-in-chandigarh.png" />
                    <Card.Body>
                    <Card.Title>Java Beginner Course</Card.Title>
                    <Card.Text>
                        <p>
                        Fee: 6k/monthly<br />
                        Duration: 3 months<br />
                        Company : <strong>Solutionists</strong><br />
                        <i>Certificate and goodies on successful completion of  the course</i>
                        </p>
                    </Card.Text>
                    </Card.Body>
                    <Card.Footer>
                    <small className="text-muted">Last updated 30 mins ago</small>
                    </Card.Footer>
                </Card>
            </CardGroup>
            <CardGroup className="gap-3 mt-3">
            <Card role="button" onClick={()=>{
                     alert("Please dial 9999992222 if you want to apply for any course")
                }}>
                <Card.Img variant="top" src="https://res.cloudinary.com/practicaldev/image/fetch/s--Tu2z9cvG--/c_limit%2Cf_auto%2Cfl_progressive%2Cq_auto%2Cw_880/https://miro.medium.com/max/696/1%2A6UpwEDOw04H5fKyaMGXpSw.png" />
                <Card.Body>
                <Card.Title>C++ Advance Level Course</Card.Title>
                <Card.Text>
                    <p>
                        Fee: 20k/monthly<br />
                        Duration: 3 months<br />
                        Company : <strong>Solutionists</strong><br />
                        <i>Certificate and goodies on successful completion of  the course</i>
                    </p>
                </Card.Text>
                </Card.Body>
                <Card.Footer>
                <small className="text-muted">Last updated 12 mins ago</small>
                </Card.Footer>
            </Card>
            <Card role="button" onClick={()=>{
                     alert("Please dial 9999992222 if you want to apply for any course")
                }}>
                <Card.Img variant="top" src="https://www.fossmint.com/wp-content/uploads/2020/03/Udemy-Advance-Python-Learning-Courses.png" />
                <Card.Body>
                <Card.Title>Python Advance Level Course</Card.Title>
                <Card.Text>
                    <p>
                        Fee: 12k/monthly<br />
                        Duration: 2 months<br />
                        Company : <strong>Solutionists</strong><br />
                        <i>Certificate and goodies on successful completion of  the course</i>
                    </p>
                </Card.Text>
                </Card.Body>
                <Card.Footer>
                <small className="text-muted">Last updated 3 mins ago</small>
                </Card.Footer>
            </Card>
            <Card role="button" onClick={()=>{
                     alert("Please dial 9999992222 if you want to apply for any course")
                }}>
                <Card.Img variant="top" src="https://www.cbitss.in/wp-content/uploads/2018/12/java-training-in-chandigarh.png" />
                <Card.Body>
                <Card.Title>Java Advance Level Course</Card.Title>
                <Card.Text>
                    <p>
                        Fee: 8k/monthly<br />
                        Duration: 4 months<br />
                        Company : <strong>Solutionists</strong><br />
                        <i>Certificate and goodies on successful completion of  the course</i>
                    </p>
                </Card.Text>
                </Card.Body>
                <Card.Footer>
                <small className="text-muted">Last updated 17 mins ago</small>
                </Card.Footer>
            </Card>
        </CardGroup>
        </Container>
    )
}