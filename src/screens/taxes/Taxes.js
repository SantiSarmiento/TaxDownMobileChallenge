import React, { useState, useEffect } from 'react'
import { ScrollView, Text, useToast, VStack } from 'native-base'
import { useSelector } from 'react-redux'
import { CustomSpinner } from '../../components/spinner/Spiner'
import SubmissionItem from './components/SubmissionItem'
import { CustomInput } from '../../components/input/Input'
import ToastAlert from '../../components/toast/CustomToast'

const Taxes = () => {

    const state = useSelector((state) => state.submissions.taxes)
    const [submissions, setSubmissions] = useState([])
    const [filteredSubmissions, setFilteredSubmissions] = useState([])
    const [loading, setLoading] = useState(true)
    const [searchText, setSearchText] = useState("")
    const [filterMethod, setFilterMethod] = useState(0)
    const toast = useToast()

    const formatSubmissions = () => {
        let submissionsArr = []
        for (let item of Object.values(state)) {
            for (let submission of item) {
                submissionsArr.push(submission)
            }
        }
        setSubmissions(submissionsArr)
        setFilteredSubmissions(submissionsArr)
        setLoading(false)
    }

    const apiDelete = (id) => {
        fetch(`http://10.0.2.2:3000/submissions/${id}`, {
            method: "DELETE",
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json'
            },
        })
            .then(res => res.json())
            .then(data => {
                toast.show({
                    placement: "bottom",
                    duration: 400,
                    render: ({
                        id
                    }) => {
                        return <ToastAlert status={"success"} variant={"left-accent"} title={"Submission deleted"} description={"The submission was deleted successfully"} />;
                    }
                })
                setSearchText("")
            })
            .catch((error) => {
                console.log(error)
            });
    }

    useEffect(() => {
        const results = submissions.filter((item) => {

            let text = searchText.toLocaleLowerCase()
            const name = (item.name).toLowerCase()
            const surname = (item.surname).toLowerCase()
            const fullName = `${(item.name).toLowerCase()} ${(item.surname).toLowerCase()}`
            const year = (item.year).toLowerCase()
            const age = (item.age).toLowerCase()

            switch (filterMethod) {
                case 0:
                    return [name, surname, fullName].some(str => str.includes(text));
                case 1:
                    return year.includes(text);
                case 2:
                    return age.includes(text);
                default:
                    return false;
            }
        })
        setFilteredSubmissions(results)
    }, [searchText])

    useEffect(() => {
        formatSubmissions()
    }, [state])

    return (
        <VStack justifyContent={loading ? "center" : "flex-start"} h={"100%"} alignItems={"center"}>
            {
                loading
                    ?
                    <CustomSpinner color={"#99f1bd"} size={"lg"} />
                    :
                    <>
                        <CustomInput holder={filterMethod === 0 ? "Filter by name and surname" : filterMethod === 1 ? "Filter by tax year" : "Filter by age"} iconCallBack={() => setFilterMethod(filterMethod === 0 ? 1 : filterMethod === 1 ? 2 : 0)} value={searchText} onChange={(value) => setSearchText(value)} variant={"outline"} type={"text"} leftIcon={"search-outline"} />
                        <ScrollView w={"100%"} contentContainerStyle={{ alignItems: "center", marginTop: 5 }}>
                            {
                                filteredSubmissions.map((item, i) => {
                                    return (
                                        <SubmissionItem key={i} item={item} apiDelete={(id) => apiDelete(id)} />
                                    )
                                })
                            }
                        </ScrollView>
                    </>

            }
        </VStack>
    )
}

export default Taxes