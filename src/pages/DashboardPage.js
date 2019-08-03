import { AnnouncementCard } from 'components/Card';
import Page from 'components/Page';
import ProductMedia from 'components/ProductMedia';
import SupportTicket from 'components/SupportTicket';
import { IconWidget, NumberWidget } from 'components/Widget';
import {
  productsData,
  supportTicketsData,
} from 'demos/dashboardPage';
import React from 'react';
import {
  MdRateReview,
  MdThumbUp,
} from 'react-icons/md';
import {
  Card,
  CardBody,
  CardGroup,
  CardHeader,
  Col,
  Row,
} from 'reactstrap';

class DashboardPage extends React.Component {
  render() {

    return (
      <Page
        className="Dashboard"
        title="Your Dashboard"
      >
        <Row>
          <Col lg={6} md={6} sm={6} xs={12}>
            <NumberWidget
              title="Books Reviewed by Users"
              subtitle="This Year"
              number="30"
              color="secondary"
              progress={{
                value: 30,
                label: 'Goal: 100',
              }}
            />
          </Col>

          <Col lg={6} md={6} sm={6} xs={12}>
            <NumberWidget
              title="Books Read by Users"
              subtitle="This Year"
              number="300"
              color="secondary"
              progress={{
                value: 30,
                label: 'Goal: 1000',
              }}
            />
          </Col>
        </Row>
        <Row>
          <Col lg="12" md="12" sm="12" xs="12">
            <AnnouncementCard
              color="gradient-secondary"
              header="Announcement"
              avatarSize={60}
              name="Jennifer"
              date="08/11/2019"
              text="We will be having a virtual book meeting with today's best-seller authors! The event will take place on September 29, 2019 at 7pm EST."
              style={{ height: 300 }}
            />
          </Col>  
        </Row>
        <Row>
          <Col lg="6" md="12" sm="12" xs="12">
            <Card>
              <CardHeader>
                <div className="d-flex justify-content-between align-items-center">
                  <span>Book Reviews by Other Users</span>
                </div>
              </CardHeader>
              <CardBody>
                {supportTicketsData.map(supportTicket => (
                  <SupportTicket key={supportTicket.id} {...supportTicket} />
                ))}
              </CardBody>
            </Card>
          </Col>

          <Col md="6" sm="12" xs="12">
            <Card>
              <CardHeader>Books on Sale</CardHeader>
              <CardBody>
                {productsData.map(
                  ({ id, image, title, description, right }) => (
                    <ProductMedia
                      key={id}
                      image={image}
                      title={title}
                      description={description}
                      right={right}
                    />
                  ),
                )}
              </CardBody>
            </Card>
          </Col>
        </Row>
        <CardGroup style={{ marginBottom: '1rem' }}>
          <IconWidget
            bgColor="white"
            inverse={false}
            icon={MdThumbUp}
            title="50+ Likes"
            subtitle="Many users liked our page"
          />
          <IconWidget
            bgColor="white"
            inverse={false}
            icon={MdRateReview}
            title="10+ Authors"
            subtitle="Many authors joined our website"
          />
        </CardGroup>
      </Page>
    );
  }
}
export default DashboardPage;
