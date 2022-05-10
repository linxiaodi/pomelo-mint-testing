import { QQSearch } from '../components/QQSearch';
import { useRequest } from 'ahooks'
import { getQQInfo } from '../api/index'
import { Loading } from '../components/Loading';
import { Empty } from '../components/Empty';
import { InfoCard } from '../components/InfoCard';

export const InfoSearch = () => {
  const { data, loading, cancel, run, mutate } = useRequest(getQQInfo, {
    manual: true,
  })

  const onChange = (qq: string) => {
    if (qq) {
      cancel();
      run({ qq })
    } else {
      cancel();
      // meaning clear
      mutate(undefined)
    }
  }

  const renderStatus = () => {
    if (loading) return <Loading />
    if (!data) return <Empty/>
    return <InfoCard source={data} />
  }

  return <div>
    <h2>QQ号查询</h2>
    <QQSearch onChange={onChange} />
    {renderStatus()}
  </div>
}
