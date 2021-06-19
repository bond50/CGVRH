import AboutContainer from "../reusables/AboutContainer";
import List from "../reusables/List";
import Link from "next/link";
import {FILE_DOWNLOAD_API} from "../../config";


const Plan = () => {
    const list = [
        {
            content: [
                {name: 'To have an effective and efficient hospital management, leadership and governance system.\n.',},
                {name: 'To broaden the scope and enhance the quality of clinical services\n.',},
                {name: 'To optimize health workforce size, skills, motivation and distribution\n.',},
                {name: 'To have an efficient health management and information system\n.',},
                {name: 'To modernize and revolutionize health infrastructure\n.',},
                {name: 'To increase resource mobilization, streamline budgeting and expenditure processes and strengthen accountability systems\n.',},
                {name: 'ensure availability and rational use of effective, safe and affordable health products and technologies\n.',},
            ]
        },
    ]

    return <AboutContainer title='VCRH Strategic Plan' para='the Office of the medical superintendent'>
        <p>
            The Constitution of Kenya 2010 grants Kenyans several rights among them being the right to health. Article
            43 (1) (a)guarantees every person the right to the highest attainable standards of health care services.
            This hospital strategic plan is aligned to the Health strategic and Investment Plan, the County Integrated
            Development Plan (CIDP), the National Health Strategic Plan(NHSP), the Medium Term Expenditure Framework
            (MTEF)Budgetary System and the Vision 2030.
        </p>
        <p>This is the first hospital strategic plan for Vihiga County Referral Hospital since its inception in 2002
            then known as Vihiga District Hospital. The formulation of this strategic plan has been an elaborate and
            consultative process involving the hospital staff, the Hospital Management Team (HMT), the Hospital
            Management Committee (HMC) and the leadership of the department of health VihigaCounty. The GIZ has been an
            instrumental partner in making the planning process a success.</p>
        <p>The Strategic Planning Committee (SPC) carried out a situational analysis and subsequently developed
            strategic objectives in line with the Ministry of Health policies and guidelines. The plan is to be
            implemented over a five year period (2018 – 2022) with monitoring and evaluation at certain points of the
            duration. The focus of the strategic plan is to enable the hospital to operate effectively as a level 5
            referral health institution in Vihiga County and its environs. </p>
        <p>The hospital management is keen to work with staff and stakeholders to make the plan a reality and to fulfill
            the goal of making the institution a health facility of choice in the region at large. </p>
        <p>The strategic objectives of the strategic plan are:</p>
        <div>
            <List list={list}/>
        </div>


        <p>
            Dr. Ayodi Lusigi <br/>
            medical superintendent<br/>
            Vihiga County and Referral Hospital <br/>
        </p>
        <div className="alert alert-link">
            <Link href={`/media/downloads/`}>
                <a>
                    Click here to download full strategic plan from download section
                </a>
            </Link>
        </div>
    </AboutContainer>;
};

export default Plan;