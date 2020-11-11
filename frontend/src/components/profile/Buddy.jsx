import React from 'react';
import './Buddy.css';

class Buddy extends React.Component {
  render() {
    let items = [];

    this.props.travelers.forEach((x) => items.push(JSON.stringify(x)));

    items = items
      .map((a) => JSON.parse(a))
      .filter(
        (x) => x.likes.includes(this.props.username) && x.likes.length > 1
      )
      .map((y) => {
        y.likes = y.likes.filter((z) => z !== this.props.username);
        return y;
      });

    return (
      <div className='Destination'>
        {items.length ? (
          items.map((d) => {
            return (
              <article className='myexotic'>
                <h1 className='mydestTitle'>{d.title}</h1>
                <img className='myspecificImage' src={d.image} alt={d.title} />
                <ul className='buddies'>
                  {d.likes.length
                    ? d.likes.map((l) => {
                        return <li>{l}</li>;
                      })
                    : null}
                </ul>
              </article>
            );
          })
        ) : (
          <h2 className='empty'>Empty List</h2>
        )}
      </div>
    );
  }
}

export default Buddy;
