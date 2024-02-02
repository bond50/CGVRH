import Link from "next/link";
import React from "react";
import {APP_NAME} from "../../config";

const Plan = () => {


    return (<>

                <p> In response to the evolving healthcare landscape, {APP_NAME} developed a strategic plan for the
                    years
                    2018-2022.
                </p>
                <p> This plan is aligned with the World Health {`Organization's`} pillars for strengthening health
                    systems, focusing on key objectives such as effective hospital management, enhanced clinical
                    services,
                    optimized health workforce, efficient health information systems, modernized infrastructure,
                    resource
                    mobilization, and rational use of health products and technologies.
                </p>
                <p>The strategic plan, involving the entire hospital staff, aims to guide the {`institution's `} growth,
                    investments, and engagement with stakeholders. It emphasizes the importance of adherence to the
                    Kenya
                    Essential Package for Health (KEPH) for a level 5 facility and sets the stage for continual
                    monitorin
                    and evaluation.
                </p>

                <p>Financially, the implementation of this strategic plan requires an investment of 2.2 billion Kenyan
                    shillings, reflecting the {`hospital's`} dedication to achieving its established goals.
                </p>
                <p>You can view the entire plan from <Link href={`/media/downloads`}>Here</Link></p>


            </>

    );
};

export default Plan;