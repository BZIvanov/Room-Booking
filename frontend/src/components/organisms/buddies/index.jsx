import React from 'react';
import './styles.css';

class Buddies extends React.Component {
  render() {
    const items = this.props.travelers
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
              <article key={d.title} className='myexotic'>
                <h1 className='mydestTitle'>{d.title}</h1>
                <img className='myspecificImage' src={d.image} alt={d.title} />
                <ul className='buddies'>
                  {d.likes.length
                    ? d.likes.map((l, i) => {
                        return <li key={l + i}>{l}</li>;
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

export default Buddies;
