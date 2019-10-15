<template>

  <div>
   
    <el-tabs type="border-card" :value="formData.common" @tab-click="clickTab">
      <el-tab-pane
        v-for="supplier in suppliers"
        :key="supplier.common"
        :label="supplier.common"
        :name="supplier.common"
        >
        <!-- <header class="header">
          <i class="el-icon-circle-plus-outline"></i>
          <span>新增采购项目</span>
        </header> -->
        <el-form
          label-width="200px"
          ref="form"
          :rules="rules"
          :model="formData"
          status-icon
        >
          <el-form-item label="机房" prop="region" required>
            <radio-button
              v-model="formData.region"
              :options="regionOptions"
            />
            <el-table :data="formData.region.zone">
              <el-table-column label="可用区" prop="common"></el-table-column>
              <el-table-column label="机器数量" prop="amount">
                <template slot-scope="scope">
                  <el-input-number
                    v-model="scope.row.amount"
                    :min="0"
                    :precision="0"
                    controls-position="right"
                  />
                </template>
              </el-table-column>
            </el-table>
          </el-form-item>

          <el-form-item label="机型" prop="modelType"  required>
            <radio-button
              :value="formData.modelType"
              :options="modelOptions"
              @change="handleModelTypeChange"
            />
              <el-table
              :data="currentFormModel"
              ref="multipleTable"
              highlight-current-row
              @current-change = "handleSelectionChange">
              <el-table-column
                label="操作"
                width="55">
                <template slot-scope="scope">
                  <el-checkbox v-model="scope.row.checked"></el-checkbox>
                </template>
              </el-table-column>
              <el-table-column label="CPU" prop="cpu"></el-table-column>
              <el-table-column label="内存" prop="memory"></el-table-column>
              <el-table-column label="可用区" prop="zone"></el-table-column>
              <!-- <el-table-column label="类型" prop="systemDiskCategory"></el-table-column> -->
              <el-table-column label="价格" prop="price"></el-table-column>
              <el-table-column label="交付周期">0天</el-table-column>
            </el-table>
          </el-form-item>

           <!-- <el-form-item label="网络信息" required prop="vswitch">
            <radio-button
              v-model="formData.vswitch"
              :options="vswitchOptions"
            />
          </el-form-item>
          <el-form-item label="镜像" required>
            <radio-button
              v-model="formData.images"
              :options="imagesOptions"
            />
          </el-form-item>
          <el-form-item label="安全组">
            <radio-button
              v-model="formData.sgroups"
              :options="groupOptions"
            />
          </el-form-item> -->
          <el-form-item label="镜像">
            <el-col class="col" >
              <el-form-item >
                <el-select
                  v-model="formData.images"
                  placeholder="选择镜像"
                >
                  <el-option
                    v-for="t in formData.region.images"
                    :key="t.id"
                    :label="t.name"
                    :value="t.image_id"
                  />
                </el-select>
              </el-form-item>
            </el-col>
          </el-form-item>
          <el-form-item label="网络信息">
            <el-col class="col">
              <el-form-item>
                <el-select
                  v-model="formData.vswitch"
                  placeholder="选择网络"
                  filterable style="width: 400px;margin-right: 20px;"
                >
                  <el-option
                    v-for="t in formData.region.vswitch"
                    :key="t.id"
                    :label="t.common"
                    :value="t.vswitch_id"
                  />
                </el-select>
              </el-form-item>
            </el-col>
          </el-form-item>

          <el-form-item label="安全组">
            <el-col class="col">
              <el-form-item>
                <el-select
                  v-model="formData.sgroups"
                  placeholder="选择安全组"
                >
                  <el-option
                    v-for="t in formData.region.sgroups"
                    :key="t.id"
                    :label="t.common"
                    :value="t.sgroup_id"
                  />
                </el-select>
              </el-form-item>
            </el-col>
          </el-form-item>

          <el-form-item label="付费方式">
            <el-col class="col">
              <el-form-item>
                <el-select
                  v-model="formData.chargeType"
                  placeholder="选择付费方式"
                >
                  <el-option
                    v-for="t in chargeTypes"
                    :key="t.id"
                    :label="t.common"
                    :value="t.name"
                  />
                </el-select>
              </el-form-item>
            </el-col>
          </el-form-item>
          <el-form-item label="主机名" required prop="hostname">
            <el-input
              v-model="formData.hostname"
            />
          </el-form-item>
          <el-form-item label="系统盘" style="text-align:left;">
          <!-- <el-form-item label="磁盘类型与数量" style="text-align:left;" required> -->
            <el-col class="col">
              <el-form-item prop="systemDisk.id">
                <el-select
                  :value="formData.systemDisk.id"
                  placeholder="选择磁盘类型"
                  @change="changeSystemDisk"
                >
                  <el-option
                    v-for="dk in currentSupplier.systemDisk"
                    :key="dk.id"
                    :label="dk.common"
                    :value="dk.id"
                  />
                </el-select>
              </el-form-item>
            </el-col>
            <el-col class="col">
              <el-form-item prop="systemDisk.size">
                <div>
                  <el-input-number
                    :value="formData.systemDisk.size"
                    placeholder="磁盘容量"
                    :min="240"
                    :max="2000"
                    :precision="0"
                    @change="changeSystemDiskSize"
                    controls-position="right"
                  />
                  (GB)
                </div>
              </el-form-item>
            </el-col>
            <!-- <el-col class="col">
              <el-form-item prop="systemDisk.amount">
                <el-input-number
                  placeholder="磁盘数量"
                  :value="formData.systemDisk.amount"
                  @change="changeSystemDiskAmount"
                  :min="1"
                  :max="20"
                  :precision="0"
                  controls-position="right"
                />
              </el-form-item>
            </el-col> -->
          </el-form-item>

          <el-form-item label="数据盘" style="text-align:left;">
          <!-- <el-form-item label="磁盘类型与数量" style="text-align:left;" required> -->
            <el-col class="col">
              <el-form-item prop="disk.id">
                <el-select
                  :value="formData.disk.id"
                   @change="changeDisk"
                  placeholder="选择磁盘类型"
                >
                  <el-option
                    v-for="dk in currentSupplier.disk"
                    :key="dk.id"
                    :label="dk.common"
                    :value="dk.id"
                  />
                </el-select>
              </el-form-item>
            </el-col>
            <el-col class="col">
              <el-form-item prop="disk.size">
                <div>
                  <el-input-number
                    :value="formData.disk.size"
                    @change="changeDiskSize"
                    placeholder="磁盘容量"
                    :min="20"
                    :max="2000"
                    :precision="0"
                    controls-position="right"
                  />
                  (GB)
                </div>
              </el-form-item>
            </el-col>
            <el-col class="col">
              <el-form-item prop="disk.amount">
                <el-input-number
                  placeholder="磁盘数量"
                  :value="formData.disk.amount"
                  @change="changeDiskAmount"
                  :min="1"
                  :max="20"
                  :precision="0"
                  controls-position="right"
                />
              </el-form-item>
            </el-col>
          </el-form-item>
          <el-form-item label="产品线" style="text-align:left;" required>
            <!-- 产品线 -->
            <el-col class="col">
              <el-form-item prop="business">
                <!-- <el-input
                  v-model="formData.business"
                  style="width: 200px;margin-right: 20px;"
                  placeholder="产品线"
                /> -->
                <el-select
                  v-model="formData.business"
                  filterable style="width: 300px;"
                  placeholder="产品线"
                   @change="getChangePdl"
                >
                  <el-option
                    :key="pdl.business"
                    v-for="pdl in pdls"
                    :value="pdl"
                    :label="pdl.business"
                  />
                </el-select>
              </el-form-item>
            </el-col>
            <!-- 审批人 -->
            <!-- <el-col class="col">
              <el-form-item prop="approver">
                <el-select
                  v-model="formData.approver"
                  filterable style="width: 200px; margin-left:100px; margin-right: 20px;"
                  placeholder="审批人"
                >
                  <el-option
                    :key="approver.username"
                    v-for="approver in approvers"
                    :value="approver.username"
                    :label="approver.name"
                  />
                </el-select>
              </el-form-item>
            </el-col> -->
            <!-- 用途 -->
            <!-- <el-col class="col">
              <el-form-item prop="purpose">
                <el-input
                v-model="formData.purpose"
                style="width: 200px;margin-left: 100px"
                placeholder="用途"/>
              </el-form-item>
            </el-col> -->
          </el-form-item>
          <el-form-item style="text-align: left;">
            <el-button type="primary" @click="handleCreate">创建</el-button>
          </el-form-item>
        </el-form>
      </el-tab-pane>
    </el-tabs>


    <el-dialog title="机器详情" :visible.sync="createVisible" width="80%">

        <el-table :data="orderData" border>
          <el-table-column label="主机名" prop="hostname"></el-table-column>
          <el-table-column label="cpu" prop="model.cpu"></el-table-column>
          <el-table-column label="内存" prop="model.memory"></el-table-column>
          <el-table-column label="可用区" prop="model.zone"></el-table-column>
          <el-table-column label="套餐" prop="model.InstanceType"></el-table-column>
          <el-table-column label="数量" prop="region.zone[0].amount"></el-table-column>
          <el-table-column label="产品线" prop="business"></el-table-column>
          <el-table-column label="付费方式" prop="chargeType"></el-table-column>
          <el-table-column label="供应商" prop="name"></el-table-column>
          <el-table-column label="提交人" prop="proposer"></el-table-column>
        </el-table> 
            <span slot="footer" class="dialog-footer">
                <el-button @click="createVisible = false">取 消</el-button>
                <el-button type="primary" @click="submitForm">创建</el-button>
            </span>
        </el-dialog>
   
  </div>
  <!-- </div> -->
</template>

<script>
/* eslint-disable */
import {mapActions} from 'vuex';
// import { constants } from 'crypto'
import RadioButton from '@/components/RadioButton';


export default {
  name: 'atlas',
  components: {
    RadioButton,
  },
  
  data() {
    return {
      formData: {
        common: undefined,
        systemDisk: {},
        disk: {},
        id: undefined,
        model: undefined,
        name: undefined,
        region: {},
        vswitch: undefined,
        sgroups: undefined,
        business: undefined,
        tag_id: undefined,
        approver: undefined,
        // purpose: undefined,
        hostname: undefined,
        chargeType: "",
      },
      createVisible: false,
      modelT:[],
      orderData: [],
      checked: true,
      choiseVisible: false,
      dataDisk: "",
      chargeTypes: [
      {
        id:2,
        name:"PostPaid",
        common: "按量付费"
      },
      {
        id: 1,
        name: "PrePaid",
        common: "包年包月"
      },
      ],
      DiskTypes: [
        {
          id: 1,
          category: "cloud_efficiency",
          common:"高效云盘"
        },
        {
          id: 2,
          category: "cloud_ssd",
          common: "SSD云盘"
        }

      ],
      rules: {
        region: {
          validator: (rule, region, callback) => {
            if (Object.keys(region).length === 0) {
              return callback('请选择机房');
            }
            return callback();
          },
        },
        sgroup: {
          validator: (rule, sgroups, callback) => {
            if (Object.keys(sgroups).length === 0) {
              return callback('请选安全组');
            }
            return callback();
          },
        },
        vswitch: {
          validator: (rule, vswitch, callback) => {
            if (Object.keys(vswitch).length === 0) {
              return callback('请选择网络');
            }
            return callback();
          },
        },
        'systemDisk.id': {
          validator: (rule, id, callback) => {
            if (!id) {
              callback('请选择磁盘类型');
            } else {
              callback();
            }
          },
        },
        'systemDisk.size': {
          validator: (rule, size, callback) => {
            if (!size) {
              callback('请选择磁盘容量');
            } else {
              callback();
            }
          },
        },
        'systemDisk.amount': {
          validator: (rule, amount, callback) => {
            if (!amount) {
              callback('请输入磁盘数量');
            } else {
              callback();
            }
          },
        },
        business: { required: true, message: '请输入产品线' },
        approver: { required: true, message: '请选择审批人' },
        // purpose: { required: true, message: '请输入用途' },

      },
    };
  },
  computed: {
      pathName() {
      return this.$route.name;
    },
    suppliers() {
      return this.$store.state.suppliers;
    },
    approvers() {
      return this.$store.state.approvers;
    },
    pdls(){
      return this.$store.state.pdls;
    },
    currentSupplier() {
      return this.suppliers.find(s => s.common === this.formData.common) || {};
    },
    currentSupplierIndex() {
      return this.suppliers.findIndex(s => s.common === this.formData.common);
    },
    modelOptions() {
      // const supplier = this.currentSupplier;
      const region = this.formData.region
      const modelType = region ? region.modelType || [] : []
      return modelType.map(v => ({
        label: v.name,
        value: v.id,
      }))
    },

    currentFormModel() {
      
      const id = this.formData.modelType
      if(typeof id === 'undefined') {
        return []
      }
      const mtype = (this.formData.region.modelType || []).find(mtype => mtype.id === id)
      if(mtype) {
        mtype.model.forEach(item =>{
        item.checked = false
      })
        return mtype.model || []
      }
      return []
    },
    
    regionOptions() {
      const supplier = this.currentSupplier;
      console.log("region:", supplier.region)
      return (supplier.region || []).map(r => ({
        label: r.common,
        value: r,
      }));
    },
    vswitchOptions() {
      const region = this.formData.region
      const vswitch = region ? region.vswitch || [] : []
      return vswitch.map(v => ({
        label: v.common,
        value: v,
      }));
    },

    imagesOptions() {
      const region = this.formData.region
      const images = region ? region.images || [] : []
      return images.map(v => ({
        label: v.name,
        value: v,
      }));
    },

    groupOptions() {
      const region = this.formData.region
      const sgroups = region ? region.sgroups || [] : []
      return sgroups.map(v => ({
        label: v.common,
        value: v.sgroup_id,
      }));
    },
  },
  
  watch: {
    suppliers(newSuppliers) {
      if (newSuppliers.length > 0 && this.formData.common === undefined) {
        const firstSuppliers = newSuppliers[0];
        this.changeSupplier(firstSuppliers.common);
      }
    },
    'formData.region'(val, oldVal) {
      if(val.id === oldVal.id) {
        return
      }
      this.formData.modelType = undefined
    }
  },
  methods: {
    ...mapActions([
      'getSuppliers',
      'purchase',
      'doOrder'
       ]),
        async getData(){
    this.formData = {
        common: undefined,
        systemDisk: {},
        disk: {},
        id: undefined,
        model: undefined,
        name: undefined,
        region: {},
        vswitch: undefined,
        sgroups: undefined,
        business: undefined,
        tag_id: undefined,
        approver: undefined,
        // purpose: undefined,
        hostname: undefined,
        chargeType: "",
      }
  },

    handleSelectionChange(row){
      let models = this.currentFormModel
       models.forEach(item => {
          // 排他,每次选择时把其他选项都清除
          if (item.id !== row.id) {
            item.checked = false
          }else{
            item.checked = true
          }
        })
        this.formData.model = row
    },
    clickTab(tab) {
      this.changeSupplier(tab.name);
    },
    handleModelTypeChange(v) {
      this.formData = {
        ...this.formData,
        modelType: v,
      }
    },
    getChangePdl(pdl){
      this.formData.tag_id = pdl.tag_id
      this.formData.business = pdl.business
    },
    changeSupplier(common) {
      const supplier = this.suppliers.find(s => s.common === common) || {};

      this.formData = {
        common: supplier.common,
        disk: {},
        systemDisk:{},
        id: supplier.id,
        name: supplier.name,
        region: {},
        vswitch: undefined,
        business: undefined,
        approver: undefined,
        // purpose: undefined,
      };
    },
    changeDisk(diskId) {
      const disk = this.currentSupplier.disk.find(d => d.id === diskId);

      this.formData.disk = {
        ...this.formData.disk,
        ...disk,
      };
    },
changeSystemDisk(diskId) {
      const systemDisk = this.currentSupplier.systemDisk.find(d => d.id === diskId);

      this.formData.systemDisk = {
        ...this.formData.systemDisk,
        ...systemDisk,
      };
    },
    // changeSystemDisk
    changeSystemDiskSize(size) {
      this.formData.systemDisk = {
        ...this.formData.systemDisk,
        size: String(size),
      };
    },
    changeSystemDiskAmount(amount) {
      this.formData.systemDisk = {
        ...this.formData.systemDisk,
        amount,
      };
    },
    
    changeDiskSize(size) {
      this.formData.disk = {
        ...this.formData.disk,
        size: String(size),
      };
    },
    changeDiskAmount(amount) {
      this.formData.disk = {
        ...this.formData.disk,
        amount,
      };
    },
    handleCreate(){
     const { formData } = this;
      
      
        const regionZone = (formData.region.zone || []).filter(z => z.amount > 0);
      this.orderData = [{
       ...formData,
          disk: [formData.disk],
          systemDisk: [formData.systemDisk],
          zone: regionZone,
          vswitch: [formData.vswitch], 
          proposer:this.$store.state.user.username,
          
          
      }]
      this.createVisible = true

    },

    submitForm() {
      // console.log("systemdisk:", this.formData.systemDisk)
      this.$refs.form[this.currentSupplierIndex].validate(async (valid) => {
        if (!valid) {
          return;
        }
        const { formData } = this;

        const regionZone = (formData.region.zone || []).filter(z => z.amount > 0);
      const systemDisk = this.formData.systemDisk.category + " * " + this.formData.systemDisk.size
      if (JSON.stringify(this.formData.disk) != '{}' ){
        this.dataDisk = this.formData.disk.category+" * "+this.formData.disk.size + " * " + this.formData.disk.amount
      } 
        await this.doOrder({
          // ...formData,
          region: this.formData.region.region_id,
          zone: this.formData.region.zone[0].zone_id,
          amount:this.formData.region.zone[0].amount,
          hostname: this.formData.hostname,
          model:this.formData.model.cpu+" * "+this.formData.model.memory,
          chargeType: this.formData.chargeType, 
          instanceType: formData.model.InstanceType,          
          vswitch:this.formData.vswitch, 
          image: this.formData.images,
          sgroup: this.formData.sgroups,
          supplier_id: this.formData.name,
          business: this.formData.business,
          systemDiskCategory: this.formData.systemDisk.category,
          systemDiskSize: this.formData.systemDisk.size,
          dataDiskCategory: this.formData.disk.category,
          diskSize:this.formData.disk.size,
          diskAmount: this.formData.disk.amount,
          proposer:this.$store.state.user.username,
          tag_id: this.formData.tag_id,
          cpu: this.formData.model.cpu
        })
      });
      this.createVisible = false;
      this.$router.push('/tree');
      // this.$router.push(`/atlas`);
    },
  },

 

  created() {
    this.getSuppliers();
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
.header{
  height: 20px;
  line-height: 20px;
  color: #999;
  border-bottom: 2px solid #e5e5e5;
  font-size: 12px;
  text-align: left;
}
.col {
  width: 200px;
  margin-right: 20px;
  input {
    width: 100%;
  }
  .el-input-number {
    width: 160px;
  }
}
</style>