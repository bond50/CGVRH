import classes from '../../styles/List.module.css'
import styles from '../../styles/Roles.module.css'
import Icon from '@iconify/react'

const List = ({list, intro}) => {
    return (
        <div className={``}>
            <div className={classes.List}>
                {intro && intro.map((para, i) => (
                    <p key={i}>{para.title}</p>
                ))}
                {list && list.map(({desc, header, header5, content}, index) => {
                    return (
                        <div key={index}>
                            {header && <div className="d-flex align-items-center ">
                                <Icon icon="bi:bi-check2" className={styles.Icon}/>
                                <h4>{header}</h4>
                            </div>}
                            {header5 && <h5>{header5}</h5>}
                            {desc && <p>{desc}</p>}
                            <ul className={styles.ListItem}>
                                {content && content.map((c, i) => (
                                    <li key={i} className={styles.ListItems}>{c.name}</li>
                                ))}
                            </ul>
                        </div>
                    )
                })}
            </div>
        </div>

    );
};

export default List;