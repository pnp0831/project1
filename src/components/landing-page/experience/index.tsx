/* eslint-disable react/no-unescaped-entities */
import styles from './experience.module.scss';

const Experience = () => (
  <section className={styles.experience}>
    <div className={styles.container}>
      <div className={styles.wrapper}>
        <ul>
          <li>
            <div>
              <div className={styles.time}>
                <span className="body3">Jan 2021 {'->'} Feb 2033</span>
                <span className="body2">FullStack Developer</span>
              </div>
              <p className="body2">Gamify Studios</p>
              <div className="body3">
                Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem
                Ipsum has been the industry's standard dummy text ever since the 1500s, when an
                unknown printer took a galley of type and scrambled it to make a type specimen book.
              </div>
            </div>
          </li>{' '}
          <li>
            <div>
              <div className={styles.time}>
                <span className="body3">Jan 2021 {'->'} Feb 2033</span>
                <span className="body2">FullStack Developer</span>
              </div>
              <p className="body2">Gamify Studios</p>
              <div className="body3">
                Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem
                Ipsum has been the industry's standard dummy text ever since the 1500s, when an
                unknown printer took a galley of type and scrambled it to make a type specimen book.
              </div>
            </div>
          </li>{' '}
          <li>
            <div>
              <div className={styles.time}>
                <span className="body3">Jan 2021 {'->'} Feb 2033</span>
                <span className="body2">FullStack Developer</span>
              </div>
              <p className="body2">Gamify Studios</p>
              <div className="body3">
                Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem
                Ipsum has been the industry's standard dummy text ever since the 1500s, when an
                unknown printer took a galley of type and scrambled it to make a type specimen book.
              </div>
            </div>
          </li>{' '}
          <li></li>
        </ul>
      </div>
    </div>
  </section>
);

export default Experience;
