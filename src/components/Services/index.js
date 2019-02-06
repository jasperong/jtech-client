import React, { Component, Fragment } from 'react';
import { Button, Header, Table, Pagination } from 'semantic-ui-react';
import { Query } from 'react-apollo';
import gql from 'graphql-tag';
import { Link } from 'react-router-dom';

import DatePicker from '../DatePicker';
import ErrorMessage from '../ErrorMessage';
import Loading from '../Layout/Loading';
import TableHead from './TableHead';
import ServiceRow from './ServiceRow';
import { m } from '../../utils';
import 'react-dates/lib/css/_datepicker.css';

class Services extends Component {
  constructor(props) {
    super(props);

    this.state = { date: m(), focused: false };
  }

  handleDateChange = (date, refetch) =>
    this.setState({ date }, () => refetch({ params: { date }, page: 0 }));

  handleFocusChange = ({ focused }) => this.setState({ focused });

  render() {
    const { date, focused } = this.state;
    return (
      <Query
        query={getServices}
        variables={{ params: { date: m().format('YYYY/MM/DD') }, page: 0 }}
      >
        {({ loading, error, data, refetch }) => {
          if (loading) return <Loading />;
          if (error) return <ErrorMessage error={error} />;

          const totalPages = Math.ceil(
            data.allServices.totalCount / data.allServices.perPage
          );

          return (
            <Fragment>
              <DatePicker
                date={date}
                focused={focused}
                id="services-datepicker"
                onDateChange={date => this.handleDateChange(date, refetch)}
                onFocusChange={this.handleFocusChange}
              />

              <Link to="/services/new">
                <Button
                  className="add__button"
                  basic
                  floated="right"
                  icon="plus"
                />
              </Link>

              <Header as="h2">
                {/* {m(data.allServices.services[0].date).format('LL')} */}
              </Header>

              <Table celled selectable>
                <TableHead />
                <Table.Body>
                  {data.allServices.services.map((service, i) => (
                    <ServiceRow key={i} service={service} />
                  ))}
                </Table.Body>
              </Table>
              {totalPages > 1 && (
                <Pagination
                  defaultActivePage={data.allServices.currentPage + 1}
                  totalPages={totalPages}
                  onPageChange={(e, data) =>
                    refetch({ params: { date }, page: data.activePage - 1 })
                  }
                />
              )}
            </Fragment>
          );
        }}
      </Query>
    );
  }
}

export default Services;

const getServices = gql`
  query getServices($params: ServiceInput, $page: Int!) {
    allServices(params: $params, page: $page) {
      services {
        id
        status
        date
        ticketNo
        employee {
          id
          fullName
          mobile
          email
        }
        office {
          alias
        }
      }
      totalCount
      currentPage
      perPage
    }
  }
`;
