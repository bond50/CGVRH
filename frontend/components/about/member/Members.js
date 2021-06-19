import MemberCard from "./MemberCard";

const Members = () => {
    const membersList = [
        {
            name: 'Dr. Vitalis Juma',
            fbLink: '',
            instaLink: '',
            twitterLink: '',
            linkedInLink: '',
            memberInfo: 'We are committed to providing equitable, affordable and quality health care of the highest standard to all our residents as stipulated in the Bill of Rights in the Constitution 2010.',
            src: '../../../static/avatar/maleavatar.jpg',
            description: 'The Medical Superintendent'
        },
        {
            name: 'Mrs. Mary Anduvate',
            fbLink: '',
            linkedInLink: '',
            instaLink: '',
            imgAlt: 'image',
            twitterLink: '',
            memberInfo: 'We are committed to providing equitable, affordable and quality health care of the highest standard to all our residents as stipulated in the Bill of Rights in the Constitution 2010.',
            src: '../../../static/avatar/femaleAvatar.jpg',
            description: 'The Hospital Administrator'
        },
        {
            name: 'Dr. Lorna Awiti',
            fbLink: '',
            instaLink: '',
            linkedInLink: '',
            imgAlt: 'image',
            twitterLink: '',
            memberInfo: 'We are committed to providing equitable, affordable and quality health care of the highest standard to all our residents as stipulated in the Bill of Rights in the Constitution 2010.',
            src: '../../../static/avatar/femaleAvatar.jpg',
            description: 'The Head Of Clinical Services'
        },
        {
            name: 'Mr. Aggrey Ememwa',
            fbLink: '',
            instaLink: '',
            linkedInLink: '',
            imgAlt: 'image',
            twitterLink: '',
            memberInfo: 'We are committed to providing equitable, affordable and quality health care of the highest standard to all our residents as stipulated in the Bill of Rights in the Constitution 2010.',
            src: '../../../static/avatar/maleavatar.jpg',
            description: 'The Hospital Nursing Officer'
        },
        {
            name: 'Dr. Duncan Mating',
            fbLink: '',
            instaLink: '',
            linkedInLink: '',
            imgAlt: 'image',
            twitterLink: '',
            memberInfo: 'We are committed to providing equitable, affordable and quality health care of the highest standard to all our residents as stipulated in the Bill of Rights in the Constitution 2010.',
            src: '../../../static/avatar/maleavatar.jpg',
            description: 'The Hospital Pharmacist'
        },
        {
            name: 'Mr. Julius Ashono',
            fbLink: '',
            instaLink: '',
            linkedInLink: '',
            imgAlt: 'image',
            twitterLink: '',
            memberInfo: 'We are committed to providing equitable, affordable and quality health care of the highest standard to all our residents as stipulated in the Bill of Rights in the Constitution 2010.',
            src: '../../../static/avatar/maleavatar.jpg',
            description: 'The Head Of Diagnostic Services'
        },
        {
            name: 'Mr. Arnest Namayi',
            fbLink: '',
            instaLink: '',
            linkedInLink: '',
            imgAlt: 'image',
            twitterLink: '',
            memberInfo: 'We are committed to providing equitable, affordable and quality health care of the highest standard to all our residents as stipulated in the Bill of Rights in the Constitution 2010.',
            src: '../../../static/avatar/maleavatar.jpg',
            description: 'The Hospital HRIO'
        },
        {
            name: 'Mr.  Aliwa',
            fbLink: '',
            instaLink: '',
            linkedInLink: '',
            imgAlt: 'image',
            twitterLink: '',
            memberInfo: 'We are committed to providing equitable, affordable and quality health care of the highest standard to all our residents as stipulated in the Bill of Rights in the Constitution 2010.',
            src: '../../../static/avatar/maleavatar.jpg',
            description: 'The Hospital PHO '
        },
    ]
    return (
        <>
            {membersList.map((member, index) => {
                return <MemberCard
                    fbLink={member.fbLink}
                    imgAlt={member.imgAlt}
                    imgSrc={member.src}
                    instaLink={member.instaLink}
                    linkedInLink={member.linkedInLink}
                    memberCadre={member.description}
                    memberName={member.name}
                    memberInfo={member.memberInfo}
                    twitterLink={member.twitterLink}/>
            })}
        </>

    );
};

export default Members;