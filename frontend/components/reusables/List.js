import classes from '../../styles/List.module.css'


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
                                <i className="bi bi-check2"/>
                                <h4>{header}</h4>
                            </div>}

                            {header5 && <h5>{header5}</h5>}
                            {desc && <p>{desc}</p>}
                            <ul>
                                {content && content.map((c, i) => (
                                    <li key={i}>{c.name}</li>
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